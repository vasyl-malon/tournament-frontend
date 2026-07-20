"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

function Combobox({
  error,
  children,
  ...props
}: ComboboxPrimitive.Root.Props<number | null, false> & {
  error?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <ComboboxPrimitive.Root {...props}>{children}</ComboboxPrimitive.Root>
      {error && (
        <p className="mt-2 text-sm text-red-400 font-normal">{error}</p>
      )}
    </div>
  );
}

// const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "flex items-center justify-between gap-2 px-3.5 py-2 text-[15px] text-gray-200 transition-colors [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]/combobox-trigger:rotate-180" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(
        "text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all pr-1",
        className,
      )}
      {...props}
    >
      <XIcon className="pointer-events-none size-4" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup
      className={cn(
        "w-full h-10 bg-brand-container border border-brand-border rounded-[0.25rem] shadow-sm transition-all duration-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <ComboboxPrimitive.Input
        render={
          <InputGroupInput
            disabled={disabled}
            className="bg-transparent border-0 focus-visible:ring-0 text-gray-100 placeholder:text-gray-500 placeholder:font-normal text-[15px] h-full px-3.5 w-full font-medium tracking-wide"
          />
        }
        {...props}
      />
      <InputGroupAddon align="inline-end" className="pr-2">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent text-gray-400 hover:text-gray-200"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-xl bg-brand-container text-gray-100 shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-brand-border duration-150 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1.5 *:data-[slot=input-group]:mb-1 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:border-brand-border/60 *:data-[slot=input-group]:bg-[#0d1117] *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-lg py-2.5 pr-8 pl-3 text-[15px] outline-none select-none text-gray-300 transition-colors duration-150 data-[highlighted]:bg-[#21262d] data-[highlighted]:text-white not-data-[variant=destructive]:data-[highlighted]:**:text-white data-disabled:pointer-events-none data-disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3 flex size-4 items-center justify-center text-emerald-400" />
        }
      >
        <CheckIcon className="pointer-events-none size-4 stroke-[2.5]" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("space-y-0.5", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-4 text-center text-sm text-gray-500 group-data-empty/combobox-content:flex",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1.5 my-1 h-px bg-[#30363d]/75", className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-11 flex-wrap items-center gap-1.5 rounded-[0.5rem] border border-brand-border bg-[#0d1117] bg-clip-padding px-3 py-2 text-[15px] transition-all duration-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-2",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-7 w-fit items-center justify-center gap-1.5 rounded-[0.375rem] bg-[#21262d] border border-[#30363d] px-2.5 text-xs font-semibold whitespace-nowrap text-gray-200 transition-colors hover:border-brand-border has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0.5",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="sm" />}
          className="-ml-1 size-5 opacity-60 hover:opacity-100 hover:bg-white/10 text-gray-400 hover:text-white rounded-md transition-all"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none size-3" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        "min-w-16 flex-1 outline-none text-gray-100 placeholder-gray-500 py-1 text-[15px] font-medium tracking-wide",
        className,
      )}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};

// "use client";

// import * as React from "react";
// import { Combobox as ComboboxPrimitive } from "@base-ui/react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
//   InputGroupInput,
// } from "@/components/ui/input-group";
// import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

// const ComboboxContext = React.createContext({
//   hasError: false,
// });

// export function Combobox({
//   error,
//   children,
//   ...props
// }: ComboboxPrimitive.Root.Props & {
//   error?: React.ReactNode;
// }) {
//   return (
//     <div className="w-full">
//       <ComboboxContext.Provider value={{ hasError: !!error }}>
//         <ComboboxPrimitive.Root {...props}>
//           {children}
//         </ComboboxPrimitive.Root>
//       </ComboboxContext.Provider>

//       {error && (
//         <p className="mt-1 text-sm text-red-400 font-medium">{error}</p>
//       )}
//     </div>
//   );
// }

// export function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
//   return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
// }

// export function ComboboxTrigger({
//   className,
//   children,
//   ...props
// }: ComboboxPrimitive.Trigger.Props) {
//   return (
//     <ComboboxPrimitive.Trigger
//       data-slot="combobox-trigger"
//       className={cn(
//         "flex items-center justify-between gap-2 px-3.5 py-2 text-[15px] text-gray-200 transition-colors [&_svg:not([class*='size-'])]:size-4",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//       <ChevronDownIcon className="pointer-events-none size-4 text-gray-400 transition-transform duration-200 group-data-[state=open]/combobox-trigger:rotate-180" />
//     </ComboboxPrimitive.Trigger>
//   );
// }

// export function ComboboxClear({
//   className,
//   ...props
// }: ComboboxPrimitive.Clear.Props) {
//   return (
//     <ComboboxPrimitive.Clear
//       data-slot="combobox-clear"
//       render={<InputGroupButton variant="ghost" size="icon-xs" />}
//       className={cn(
//         "text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all pr-1",
//         className,
//       )}
//       {...props}
//     >
//       <XIcon className="pointer-events-none size-4" />
//     </ComboboxPrimitive.Clear>
//   );
// }

// export function ComboboxInput({
//   className,
//   children,
//   disabled = false,
//   showTrigger = true,
//   showClear = false,
//   ...props
// }: ComboboxPrimitive.Input.Props & {
//   showTrigger?: boolean;
//   showClear?: boolean;
// }) {
//   const { hasError } = React.useContext(ComboboxContext);

//   return (
//     <InputGroup
//       className={cn(
//         "w-full h-10 bg-brand-container rounded-[0.25rem] shadow-sm transition-all duration-200",
//         hasError
//           ? "border border-red-500 ring-2 ring-red-500/20"
//           : "border border-brand-border focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
//         disabled && "opacity-50 cursor-not-allowed",
//         className,
//       )}
//     >
//       <ComboboxPrimitive.Input
//         render={
//           <InputGroupInput
//             disabled={disabled}
//             className="bg-transparent border-0 focus-visible:ring-0 text-gray-100 placeholder:text-gray-500 placeholder:font-normal text-[15px] h-full px-3.5 w-full font-medium tracking-wide"
//           />
//         }
//         {...props}
//       />

//       <InputGroupAddon align="inline-end" className="pr-2">
//         {showTrigger && (
//           <InputGroupButton
//             size="icon-xs"
//             variant="ghost"
//             render={<ComboboxTrigger />}
//             className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent text-gray-400 hover:text-gray-200"
//             disabled={disabled}
//           />
//         )}

//         {showClear && <ComboboxClear disabled={disabled} />}
//       </InputGroupAddon>

//       {children}
//     </InputGroup>
//   );
// }
