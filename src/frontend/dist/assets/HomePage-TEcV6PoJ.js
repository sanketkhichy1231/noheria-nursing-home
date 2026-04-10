import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, R as React, H as Heart, L as Link, M as MapPin, P as Phone, a as Mail, S as Stethoscope, U as Users } from "./index-b-kEL4Ku.js";
import { u as useControllableState, P as Primitive, a as useId, c as composeEventHandlers, b as Presence, d as createContextScope, e as useLayoutEffect2 } from "./index-DYySJRn_.js";
import { c as createCollection, u as useDirection } from "./index-DJNBLJT4.js";
import { u as useComposedRefs, B as Button } from "./button-P341Onhk.js";
import { c as cn, S as Skeleton } from "./skeleton-MV_wEVED.js";
import { C as ChevronDown } from "./chevron-down-BhCoQgzK.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { C as Card, a as CardContent } from "./card-BQUDAgz6.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { T as Textarea } from "./textarea-BMR9WIWK.js";
import { u as useCreateAppointment, a as useAvailableSlots } from "./useAppointments-BfO9sWka.js";
import { u as usePublishedBlogs } from "./useBlogs-BPpLHOEo.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { u as useSiteContent } from "./useSiteContent-CT2991nJ.js";
import { m as motion, C as Clock } from "./proxy-BI_OhE29.js";
import { C as CalendarDays } from "./calendar-days-DEH2PRyn.js";
import { C as ChevronRight } from "./chevron-right-CHVKFiID.js";
import { B as BookOpen, V as Video } from "./video-ClyrRza8.js";
import "./useMutation-DbJwC5eP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
  ["path", { d: "M15 12h.01", key: "1k8ypt" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
      key: "11xh7x"
    }
  ],
  ["path", { d: "M9 12h.01", key: "157uk2" }]
];
const Baby = createLucideIcon("baby", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      var _a;
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => {
        var _a2;
        return !((_a2 = item.ref.current) == null ? void 0 : _a2.disabled);
      });
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      (_a = triggerCollection[clampedIndex].ref.current) == null ? void 0 : _a.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger2,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const ICON_MAP = {
  stethoscope: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6" }),
  heart: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6" }),
  baby: /* @__PURE__ */ jsxRuntimeExports.jsx(Baby, { className: "w-6 h-6" }),
  activity: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6" }),
  shield: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
  users: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }),
  building: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6" }),
  clock: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6" }),
  default: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6" })
};
function getIcon(icon) {
  return ICON_MAP[icon.toLowerCase()] ?? ICON_MAP.default;
}
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function scrollTo(id) {
  var _a;
  (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
}
function HeroSection() {
  const { data: content, isLoading } = useSiteContent();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-[90vh] flex items-center overflow-hidden",
      style: {
        background: "linear-gradient(135deg, #0f1624 0%, #1a2035 50%, #1e1530 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center opacity-25",
            style: {
              backgroundImage: "url(https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1400&q=80)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0f1624]/95 via-[#1a2035]/80 to-[#0f1624]/60 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#dc2626]/8 to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#16a34a]/5 blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative z-10 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#dc2626]/40 bg-[#dc2626]/10 text-[#e11d48] text-xs font-semibold mb-6 tracking-wide uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" }),
                "Est. 1994 · Panchkula, Haryana · Maternity & Nursing Care"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              className: "font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6",
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.1 },
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-3/4 bg-white/10" }) : (content == null ? void 0 : content.heroTitle) || "Expert Care, Compassionate Healing"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-white/70 text-lg md:text-xl leading-relaxed mb-4 font-body",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.2 },
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-2/3 bg-white/10" }) : (content == null ? void 0 : content.heroTagline) || "Noheria Nursing Home — Trusted healthcare for every family since 1994."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-white/55 text-base leading-relaxed mb-10 max-w-2xl",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.3 },
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full bg-white/10" }) : (content == null ? void 0 : content.heroIntro) || "From emergency care to maternity services, our experienced team of doctors and nurses is dedicated to your well-being. Modern facilities, personal attention, and decades of trust."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col sm:flex-row gap-4",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollTo("appointment"),
                    className: "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#dc2626] hover:bg-[#e11d48] text-white rounded-lg text-base font-semibold transition-smooth shadow-lg shadow-[#dc2626]/30",
                    "data-ocid": "hero-cta-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5" }),
                      isLoading ? "Book Appointment Now" : (content == null ? void 0 : content.heroCtaText) || "Book Appointment Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollTo("services"),
                    className: "inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white/80 hover:border-white/40 hover:text-white rounded-lg text-base font-semibold transition-smooth",
                    children: [
                      "Our Services ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "mt-16 flex flex-wrap gap-8",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.8, delay: 0.6 },
              children: [
                {
                  label: "Years of Service",
                  value: "30+",
                  color: "text-[#e11d48]"
                },
                {
                  label: "Patients Served",
                  value: "50,000+",
                  color: "text-[#22c55e]"
                },
                {
                  label: "Specialist Doctors",
                  value: "15+",
                  color: "text-[#e11d48]"
                },
                {
                  label: "Emergency Response",
                  value: "24/7",
                  color: "text-[#22c55e]"
                }
              ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-display text-3xl font-bold ${stat.color}`,
                    children: stat.value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs uppercase tracking-wide mt-0.5", children: stat.label })
              ] }, stat.label))
            }
          )
        ] }) })
      ]
    }
  );
}
function ServicesSection() {
  var _a;
  const { data: content, isLoading } = useSiteContent();
  const fallbackServices = [
    {
      id: 1n,
      order: 1n,
      icon: "heart",
      title: "General Medicine",
      description: "Comprehensive diagnosis and treatment for acute and chronic medical conditions by experienced physicians."
    },
    {
      id: 2n,
      order: 2n,
      icon: "baby",
      title: "Maternity Care",
      description: "Complete antenatal, delivery, and postnatal care in a warm, supportive environment for mother and baby."
    },
    {
      id: 3n,
      order: 3n,
      icon: "activity",
      title: "Emergency Services",
      description: "Round-the-clock emergency care with rapid response and life-saving interventions available 24/7."
    },
    {
      id: 4n,
      order: 4n,
      icon: "stethoscope",
      title: "Pediatrics",
      description: "Specialized medical care for infants, children, and adolescents by dedicated pediatric specialists."
    },
    {
      id: 5n,
      order: 5n,
      icon: "shield",
      title: "Surgical Care",
      description: "Modern operation theatres with skilled surgical teams for planned and emergency procedures."
    },
    {
      id: 6n,
      order: 6n,
      icon: "users",
      title: "Nursing Care",
      description: "Professional and compassionate nursing services ensuring patient comfort and speedy recovery."
    }
  ];
  const services = ((_a = content == null ? void 0 : content.services) == null ? void 0 : _a.length) ? content.services : fallbackServices;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "py-20 bg-[#0f1624]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Our Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Comprehensive Medical Care" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-2xl mx-auto text-base", children: "From routine check-ups to specialized treatments, we offer a full spectrum of healthcare services under one roof." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl bg-white/5" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#1a2035] border-white/8 hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-[#22c55e]/10 transition-smooth group h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] mb-4 group-hover:bg-[#22c55e]/15 group-hover:text-[#22c55e] transition-smooth", children: getIcon(service.icon) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-white mb-2", children: service.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm leading-relaxed", children: service.description })
        ] }) })
      },
      service.id.toString()
    )) })
  ] }) });
}
const DOCTOR_IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
  // female
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80",
  // male
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&q=80",
  // female
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80"
  // male
];
function DoctorsSection() {
  const { data: doctors, isLoading } = useDoctors();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "doctors", className: "py-20 bg-[#151e30]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Our Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Meet Our Doctors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-2xl mx-auto text-base", children: "Our team of experienced and compassionate specialists is committed to your health and well-being." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: ["d1", "d2", "d3", "d4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-60 rounded-xl bg-white/5" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: (doctors ?? []).map((doctor, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#1a2035] border-white/8 hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-[#22c55e]/10 transition-smooth group text-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden border-2 border-[#dc2626]/30 group-hover:border-[#22c55e]/50 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: DOCTOR_IMAGES[i % DOCTOR_IMAGES.length],
                alt: `Dr. ${doctor.name}`,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add(
                      "bg-gradient-to-br",
                      "from-[#dc2626]/30",
                      "to-[#1a2035]",
                      "flex",
                      "items-center",
                      "justify-center"
                    );
                    parent.innerHTML = `<span class="text-white font-display text-xl font-bold">${getInitials(doctor.name)}</span>`;
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1a2035] ${doctor.isOnline ? "bg-[#22c55e]" : "bg-white/30"}`,
                title: doctor.isOnline ? "Online" : "Offline"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-white text-base", children: [
              "Dr. ",
              doctor.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#e11d48] text-xs font-medium mt-0.5", children: doctor.specialization }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `mt-2 text-[10px] ${doctor.isOnline ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30" : "bg-white/5 text-white/40 border-white/10"}`,
                children: doctor.isOnline ? "Available" : "Unavailable"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => scrollTo("appointment"),
              className: "w-full mt-auto py-2 rounded-lg border border-[#dc2626]/40 text-[#e11d48] text-sm font-semibold hover:bg-[#dc2626]/10 transition-smooth",
              "data-ocid": `book-doctor-${doctor.id}`,
              children: "Book Appointment"
            }
          )
        ] }) })
      },
      doctor.id.toString()
    )) })
  ] }) });
}
function AppointmentSection() {
  const { data: doctors } = useDoctors();
  const createAppointment = useCreateAppointment();
  const [patientName, setPatientName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [problem, setProblem] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [slot, setSlot] = reactExports.useState("");
  const [doctorId, setDoctorId] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const selectedDoctorId = doctorId ? BigInt(doctorId) : null;
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(
    date,
    selectedDoctorId
  );
  function handleDateChange(val) {
    setDate(val);
    setSlot("");
  }
  function handleDoctorChange(val) {
    setDoctorId(val);
    setSlot("");
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  async function handleSubmit(e) {
    e.preventDefault();
    if (!patientName || !phone || !date || !slot) return;
    try {
      await createAppointment.mutateAsync({
        patientName,
        phone,
        problem,
        date,
        slot,
        doctorId: selectedDoctorId
      });
      setSubmitted(true);
      setPatientName("");
      setPhone("");
      setProblem("");
      setDate("");
      setSlot("");
      setDoctorId("");
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "appointment", className: "py-20 bg-[#0f1624]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Book Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Schedule an Appointment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-2xl mx-auto text-base", children: "Choose your preferred doctor, date, and time. We'll confirm your booking promptly." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay: 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col gap-4 lg:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden border border-white/8 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80",
                alt: "Doctor patient consultation",
                className: "w-full h-72 object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1a2035] rounded-xl border border-[#22c55e]/20 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#22c55e] text-xs font-semibold uppercase tracking-wide", children: "Doctors Available Now" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs", children: "Our specialists are ready to see you. Book your slot and get confirmed within minutes." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 bg-[#1a2035] rounded-2xl border border-[#22c55e]/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-[#22c55e]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-white mb-2", children: "Appointment Requested!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-6", children: "We've received your appointment request. Our team will confirm your booking shortly." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => setSubmitted(false),
                className: "bg-[#dc2626] hover:bg-[#e11d48] text-white",
                "data-ocid": "book-another-btn",
                children: "Book Another"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "bg-[#1a2035] rounded-2xl border border-white/8 p-8 space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Doctor (optional — we'll auto-assign if none selected)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: doctorId,
                        onChange: (e) => handleDoctorChange(e.target.value),
                        className: "w-full h-10 px-3 rounded-md border border-white/10 bg-[#0f1624] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50",
                        "data-ocid": "doctor-select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Any Available Doctor" }),
                          (doctors ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.id.toString(), children: [
                            "Dr. ",
                            d.name,
                            " — ",
                            d.specialization
                          ] }, d.id.toString()))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Preferred Date *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "date",
                        min: today,
                        value: date,
                        onChange: (e) => handleDateChange(e.target.value),
                        required: true,
                        className: "bg-[#0f1624] border-white/10 text-white focus:ring-[#dc2626]/50 [color-scheme:dark]",
                        "data-ocid": "date-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Time Slot *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: slot,
                        onChange: (e) => setSlot(e.target.value),
                        required: true,
                        disabled: !date || slotsLoading,
                        className: "w-full h-10 px-3 rounded-md border border-white/10 bg-[#0f1624] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 disabled:opacity-50",
                        "data-ocid": "slot-select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: !date ? "Select a date first" : slotsLoading ? "Loading slots..." : (slots == null ? void 0 : slots.length) === 0 ? "No slots available" : "Select a time slot" }),
                          (slots ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, className: "text-[#22c55e]", children: [
                            "✓ ",
                            s
                          ] }, s))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Patient Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Full name",
                        value: patientName,
                        onChange: (e) => setPatientName(e.target.value),
                        required: true,
                        className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50",
                        "data-ocid": "patient-name-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Phone Number *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "tel",
                        placeholder: "+91 98765 43210",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        required: true,
                        className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50",
                        "data-ocid": "phone-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/80 text-sm font-medium mb-1.5 block", children: "Describe Your Problem / Reason for Visit" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        rows: 3,
                        placeholder: "Brief description of symptoms or reason for visit...",
                        value: problem,
                        onChange: (e) => setProblem(e.target.value),
                        className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50 resize-none",
                        "data-ocid": "problem-textarea"
                      }
                    )
                  ] })
                ] }),
                createAppointment.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm", children: "Something went wrong. Please try again." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: createAppointment.isPending,
                    className: "w-full py-3 bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold text-base rounded-lg shadow-lg shadow-[#dc2626]/20 transition-smooth",
                    "data-ocid": "submit-appointment-btn",
                    children: createAppointment.isPending ? "Booking..." : "Confirm Appointment"
                  }
                )
              ]
            }
          ) })
        ]
      }
    )
  ] }) });
}
function BlogSection() {
  const { data: blogs, isLoading } = usePublishedBlogs();
  const recent = (blogs ?? []).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "blog", className: "py-20 bg-[#151e30]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Health Education" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Latest Health Articles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-2xl mx-auto text-base", children: "Expert advice, health tips, and medical insights from our team of specialists." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["b1", "b2", "b3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-xl bg-white/5" }, k)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-white/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No articles published yet. Check back soon!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: recent.map((blog, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#1a2035] border-white/8 hover:border-[#dc2626]/40 transition-smooth group h-full flex flex-col", children: [
          blog.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 overflow-hidden rounded-t-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: blog.imageUrl,
              alt: blog.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) }),
          !blog.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-44 overflow-hidden rounded-t-xl relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
                alt: "Medical health",
                className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#1a2035]/80 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3", children: blog.blogType === "Video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-6 h-6 text-white/80" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-white/80" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[10px] ${blog.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`,
                  children: blog.blogType === "Video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3 mr-1" }),
                    "Video"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 mr-1" }),
                    "Blog"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: new Date(
                Number(blog.createdAt) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-white text-base mb-2 line-clamp-2 group-hover:text-[#e11d48] transition-colors", children: blog.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/55 text-sm leading-relaxed mb-4 flex-1 line-clamp-3", children: [
              blog.content.replace(/<[^>]+>/g, "").slice(0, 100),
              blog.content.length > 100 ? "..." : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog/$id",
                params: { id: blog.id.toString() },
                className: "inline-flex items-center gap-1 text-[#e11d48] text-sm font-semibold hover:gap-2 transition-smooth mt-auto",
                "data-ocid": `read-blog-${blog.id}`,
                children: [
                  "Read More ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] })
      },
      blog.id.toString()
    )) })
  ] }) });
}
function TestimonialsSection() {
  var _a;
  const { data: content, isLoading } = useSiteContent();
  const fallbackTestimonials = [
    {
      id: 1n,
      name: "Priya Sharma",
      role: "Patient, Maternity Ward",
      text: "The care I received during my delivery was exceptional. The nurses and doctors made the experience calm, safe, and beautiful. I'm forever grateful to the Noheria team.",
      rating: 5n
    },
    {
      id: 2n,
      name: "Rajesh Kumar",
      role: "Patient, General Medicine",
      text: "Dr. Mehta's diagnosis was spot-on and thorough. The staff was professional and the facility was clean and modern. Highly recommend for any medical needs.",
      rating: 5n
    },
    {
      id: 3n,
      name: "Anita Singh",
      role: "Patient, Pediatrics",
      text: "Brought my 2-year-old for high fever at midnight — the emergency team responded immediately. They were so gentle with my child. Outstanding service.",
      rating: 5n
    }
  ];
  const testimonials = ((_a = content == null ? void 0 : content.testimonials) == null ? void 0 : _a.length) ? content.testimonials : fallbackTestimonials;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "testimonials", className: "py-20 bg-[#0f1624]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Testimonials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "What Patients Say" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-xl mx-auto text-base", children: "Real stories from the people we care for, every day." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["t1", "t2", "t3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-xl bg-white/5" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#1a2035] border-white/8 h-full relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 right-5 text-[#dc2626]/30 font-serif text-6xl leading-none select-none", children: '"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm leading-relaxed mb-5 relative z-10", children: t.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#dc2626]/20 flex items-center justify-center text-[#e11d48] font-bold text-sm shrink-0", children: getInitials(t.name) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/45 text-xs", children: t.role })
            ] })
          ] })
        ] }) })
      },
      t.id.toString()
    )) })
  ] }) });
}
function FAQSection() {
  var _a;
  const { data: content, isLoading } = useSiteContent();
  const fallbackFaqs = [
    {
      id: 1n,
      order: 1n,
      question: "What are your OPD hours?",
      answer: "Our OPD is open Monday to Saturday, 9:00 AM to 7:00 PM. Emergency services are available 24/7, 365 days a year."
    },
    {
      id: 2n,
      order: 2n,
      question: "Do I need an appointment for a regular check-up?",
      answer: "While walk-ins are welcome, booking an appointment ensures you see your preferred doctor without waiting. You can book online or call us directly."
    },
    {
      id: 3n,
      order: 3n,
      question: "What insurance plans do you accept?",
      answer: "We accept most major health insurance providers including CGHS, ESIC, and all major private health insurers. Please call us to verify your specific plan."
    },
    {
      id: 4n,
      order: 4n,
      question: "Is maternity care available around the clock?",
      answer: "Yes, our maternity ward is operational 24/7 with experienced obstetricians and nursing staff always on call to ensure safe deliveries at any hour."
    },
    {
      id: 5n,
      order: 5n,
      question: "How can I access my medical records?",
      answer: "Patient medical records can be requested at the front desk during OPD hours. We can also provide digital copies via email upon written request and identity verification."
    }
  ];
  const faqs = ((_a = content == null ? void 0 : content.faqs) == null ? void 0 : _a.length) ? content.faqs : fallbackFaqs;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "py-20 bg-[#151e30]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "FAQ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-xl mx-auto text-base", children: "Quick answers to the questions we hear most often." })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["f1", "f2", "f3", "f4", "f5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg bg-white/5" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "space-y-2", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -10 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.06 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AccordionItem,
          {
            value: faq.id.toString(),
            className: "bg-[#1a2035] border border-white/8 rounded-lg px-4 overflow-hidden",
            "data-ocid": `faq-item-${faq.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-white text-sm font-medium hover:text-[#e11d48] hover:no-underline py-4 [&>svg]:text-[#e11d48]", children: faq.question }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-white/60 text-sm leading-relaxed pb-4", children: faq.answer })
            ]
          }
        )
      },
      faq.id.toString()
    )) })
  ] }) });
}
function ContactSection() {
  const { data: content, isLoading } = useSiteContent();
  const [contactForm, setContactForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [sent, setSent] = reactExports.useState(false);
  const contact = (content == null ? void 0 : content.contactInfo) ?? {
    address: "Sector 6, Panchkula, Haryana 134109",
    phone: "+91 172 256 0000",
    email: "info@noherianursinghome.com",
    hours: "Mon–Sat: 9:00 AM – 7:00 PM | Emergency: 24/7"
  };
  function handleContactSubmit(e) {
    e.preventDefault();
    setSent(true);
    setContactForm({ name: "", email: "", message: "" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "py-20 bg-[#0f1624]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center mb-14",
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-4", children: "Contact Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-xl mx-auto text-base", children: "We're here to help. Reach out for queries, appointments, or emergencies." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "space-y-6",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["c1", "c2", "c3", "c4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 bg-white/5 rounded-lg" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
                label: "Address",
                value: contact.address
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
                label: "Phone",
                value: contact.phone
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }),
                label: "Email",
                value: contact.email
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
                label: "Hours",
                value: contact.hours
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] shrink-0 mt-0.5", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs uppercase tracking-wide mb-0.5", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm", children: item.value })
              ] })
            ] }, item.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 p-5 bg-[#dc2626]/10 border border-[#dc2626]/20 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#e11d48] font-semibold text-sm mb-1", children: "🚨 Emergency?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: "Our emergency department is available 24 hours, 7 days a week. Come directly or call ahead." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.1 },
          children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-[#1a2035] rounded-2xl border border-white/8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-green-400 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-white mb-2", children: "Message Sent!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm", children: "We'll get back to you within 24 hours." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => setSent(false),
                variant: "ghost",
                className: "mt-4 text-[#e11d48] hover:text-[#e11d48] hover:bg-[#dc2626]/10",
                children: "Send Another"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleContactSubmit,
              className: "bg-[#1a2035] rounded-2xl border border-white/8 p-6 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-white", children: "Quick Inquiry" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm mb-1.5 block", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Your name",
                      value: contactForm.name,
                      onChange: (e) => setContactForm((f) => ({ ...f, name: e.target.value })),
                      required: true,
                      className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30",
                      "data-ocid": "contact-name-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm mb-1.5 block", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "email",
                      placeholder: "your@email.com",
                      value: contactForm.email,
                      onChange: (e) => setContactForm((f) => ({ ...f, email: e.target.value })),
                      required: true,
                      className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30",
                      "data-ocid": "contact-email-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm mb-1.5 block", children: "Message" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 4,
                      placeholder: "How can we help you?",
                      value: contactForm.message,
                      onChange: (e) => setContactForm((f) => ({ ...f, message: e.target.value })),
                      required: true,
                      className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 resize-none",
                      "data-ocid": "contact-message-textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold",
                    "data-ocid": "contact-submit-btn",
                    children: "Send Message"
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] }) });
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "#0f1624" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, {})
  ] });
}
export {
  HomePage as default
};
