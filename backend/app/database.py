from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from app.config import settings


from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode

db_url = settings.DATABASE_URL
parsed = urlparse(db_url)
queries = dict(parse_qsl(parsed.query))
has_ssl = "sslmode" in queries or "ssl" in queries

# Remove parameters that asyncpg doesn't accept as connect options
queries.pop("sslmode", None)
queries.pop("channel_binding", None)

new_query = urlencode(queries)
db_url = urlunparse(parsed._replace(query=new_query))

connect_args = {}
if has_ssl:
    import ssl
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    connect_args["ssl"] = ssl_context

engine = create_async_engine(
    db_url,
    echo=False,
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=300
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
