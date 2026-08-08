# Verify: Backend FastAPI Service Setup (spec 0003)

Verification steps derived from the backend setup acceptance criteria.

## API Checks
* [ ] Send request to `/health` => Expect JSON response `{"status": "healthy", "service": "noiseless-api"}` with HTTP 200.
* [ ] Send POST request to `/watches` with a valid JSON payload => Expect watch created in the database and a status message with HTTP 200.
* [ ] Send GET request to `/watches` => Expect a list of watches for the authenticated user ID.
* [ ] Send POST request to `/internal/run-watch/{id}` => Expect the background agent pipeline to trigger.

## Commands
* [ ] Execute `.venv/bin/python -m uvicorn app.main:app --port 8000` => Expect FastAPI server to start successfully on port 8000.
* [ ] Execute `.venv/bin/python -c "import app.main"` => Expect all imports and models to resolve cleanly.
