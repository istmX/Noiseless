"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { watchFormSchema, WatchFormValues } from "../types";
import { DEFAULT_WATCH_FORM_VALUES } from "../constants";
import { createWatch } from "../actions";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Plus, X, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface WatchFormProps {
  onSuccess?: () => void;
}

export function WatchForm({ onSuccess }: WatchFormProps) {
  const form = useForm<WatchFormValues>({
    resolver: zodResolver(watchFormSchema),
    defaultValues: DEFAULT_WATCH_FORM_VALUES as WatchFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "searchQueries",
    control: form.control,
  });

  const onSubmit = async (data: WatchFormValues) => {
    const res = await createWatch(data);
    if (res.error) {
      toast.error("Unable to save watch", { description: res.error });
      return;
    }
    toast.success("Watch Created", { description: "Your watch has been created and will run soon." });
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
      
      {/* SECTION: GENERAL */}
      <div className="space-y-6">
        <div className="border-b border-hairline/50 pb-2">
          <h3 className="text-overline text-ink-muted uppercase tracking-widest font-semibold">General</h3>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="topic" className="text-body-sm font-medium text-ink">Topic Name</Label>
          <Input 
            id="topic" 
            placeholder="e.g. Artificial Intelligence Regulatory News"
            className="bg-surface-inset border-hairline font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-lg transition-all shadow-sm"
            {...form.register("topic")} 
          />
          {form.formState.errors.topic && <p className="text-danger text-body-sm mt-1">{form.formState.errors.topic.message}</p>}
        </div>
      </div>

      {/* SECTION: SOURCES */}
      <div className="space-y-6">
        <div className="border-b border-hairline/50 pb-2 flex justify-between items-end">
          <h3 className="text-overline text-ink-muted uppercase tracking-widest font-semibold">Target Queries</h3>
          <span className="text-xs text-ink-faint">Web searches the agent will run</span>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {fields.map((field, index) => (
              <motion.div 
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3 items-center overflow-hidden"
              >
                <div className="relative flex-1 group">
                  <Input
                    {...form.register(`searchQueries.${index}.value`)}
                    placeholder="e.g. 'OpenAI site:openai.com/blog'"
                    className="bg-surface-inset border-hairline font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary h-11 rounded-lg transition-all shadow-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-faint hover:text-danger opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity cursor-pointer rounded-md hover:bg-danger/10"
                    title="Remove query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => append({ value: "" })}
            className="text-primary hover:text-primary-hover hover:bg-primary/5 font-sans font-medium px-2 -ml-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add another query
          </Button>
          {form.formState.errors.searchQueries && <p className="text-danger text-body-sm">{form.formState.errors.searchQueries.message}</p>}
        </div>
      </div>

      {/* SECTION: ENGINE CONFIG */}
      <div className="space-y-6">
        <div className="border-b border-hairline/50 pb-2">
          <h3 className="text-overline text-ink-muted uppercase tracking-widest font-semibold">Engine Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-body-sm font-medium text-ink">Run Frequency</Label>
            <Select 
              onValueChange={(val) => form.setValue("frequency", val as "hourly" | "daily" | "weekly")} 
              defaultValue={form.getValues("frequency")}
            >
              <SelectTrigger className="bg-surface-inset border-hairline font-sans h-11 rounded-lg cursor-pointer shadow-sm">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly" className="cursor-pointer">Hourly</SelectItem>
                <SelectItem value="daily" className="cursor-pointer">Daily</SelectItem>
                <SelectItem value="weekly" className="cursor-pointer">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-body-sm font-medium text-ink">Significance Threshold</Label>
              <span className="text-xs text-ink-faint font-mono">1-10</span>
            </div>
            <Input 
              type="number" 
              min={1} 
              max={10} 
              className="bg-surface-inset border-hairline font-mono h-11 rounded-lg focus:border-primary transition-all shadow-sm"
              {...form.register("significanceThreshold", { valueAsNumber: true })} 
            />
          </div>
        </div>
      </div>

      {/* SECTION: NOTIFICATIONS */}
      <div className="space-y-6">
        <div className="border-b border-hairline/50 pb-2">
          <h3 className="text-overline text-ink-muted uppercase tracking-widest font-semibold">Delivery</h3>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-body-sm font-medium text-ink flex items-center gap-2">
              Email Address <span className="px-1.5 py-0.5 bg-surface-inset border border-hairline rounded text-[10px] text-ink-faint">Optional</span>
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="e.g. alerts@company.com"
              className="bg-surface-inset border-hairline font-sans h-11 rounded-lg focus:border-primary transition-all shadow-sm"
              {...form.register("notificationEmail")} 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="slack" className="text-body-sm font-medium text-ink flex items-center gap-2">
              Slack Webhook <span className="px-1.5 py-0.5 bg-surface-inset border border-hairline rounded text-[10px] text-ink-faint">Optional</span>
            </Label>
            <Input 
              id="slack" 
              type="url" 
              placeholder="https://hooks.slack.com/services/..."
              className="bg-surface-inset border-hairline font-mono text-sm h-11 rounded-lg focus:border-primary transition-all shadow-sm"
              {...form.register("notificationSlackWebhook")} 
            />
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-8 border-t border-hairline/50 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 sticky bottom-0 bg-surface-elevated pb-2 z-10">
        <div className="flex items-center gap-3 bg-surface-inset/50 px-3 py-2 rounded-lg border border-hairline/50">
          <Switch 
            id="active" 
            checked={form.watch("active")}
            onCheckedChange={(val) => form.setValue("active", val)}
            className="cursor-pointer"
          />
          <Label htmlFor="active" className="text-body-sm font-medium text-ink cursor-pointer">Start immediately</Label>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="ghost"
            className="flex-1 sm:flex-none font-sans text-ink-muted hover:text-ink hover:bg-surface-inset rounded-lg h-11 px-6 cursor-pointer transition-colors"
            onClick={() => { if (onSuccess) onSuccess(); }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-lg h-11 px-8 shadow-md cursor-pointer transition-all"
          >
            {form.formState.isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            Save Watch
          </Button>
        </div>
      </div>

    </form>
  );
}
