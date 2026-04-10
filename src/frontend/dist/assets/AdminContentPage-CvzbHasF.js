import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-b-kEL4Ku.js";
import { a as useCallbackRef, u as ue } from "./index-BgcjeN31.js";
import { u as useComposedRefs, B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent } from "./card-BQUDAgz6.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { c as cn, S as Skeleton } from "./skeleton-MV_wEVED.js";
import { a as useId, P as Primitive, c as composeEventHandlers, d as createContextScope, u as useControllableState, b as Presence } from "./index-DYySJRn_.js";
import { c as createCollection, u as useDirection } from "./index-DJNBLJT4.js";
import { T as Textarea } from "./textarea-BMR9WIWK.js";
import { u as useSiteContent, a as useUpdateHeroSection, b as useUpdateServices, c as useUpdateTestimonials, d as useUpdateFAQs, e as useUpdateContactInfo } from "./useSiteContent-CT2991nJ.js";
import { T as Trash2 } from "./trash-2-Dv5ZttQN.js";
import { P as Plus } from "./plus-GDDDW69H.js";
import "./useMutation-DbJwC5eP.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function HeroTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateHero = useUpdateHeroSection();
  const [title, setTitle] = reactExports.useState("");
  const [tagline, setTagline] = reactExports.useState("");
  const [intro, setIntro] = reactExports.useState("");
  const [ctaText, setCtaText] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (content) {
      setTitle(content.heroTitle);
      setTagline(content.heroTagline);
      setIntro(content.heroIntro);
      setCtaText(content.heroCtaText);
    }
  }, [content]);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateHero.mutateAsync({
        heroTitle: title,
        heroTagline: tagline,
        heroIntro: intro,
        heroCtaText: ctaText
      });
      ue.success("Hero section saved");
    } catch {
      ue.error("Failed to save");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4 max-w-xl", children: [
    [
      { id: "heroTitle", label: "Title", value: title, set: setTitle },
      {
        id: "heroTagline",
        label: "Tagline",
        value: tagline,
        set: setTagline
      },
      {
        id: "heroCta",
        label: "CTA Button Text",
        value: ctaText,
        set: setCtaText
      }
    ].map(({ id, label, value, set }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          value,
          onChange: (e) => set(e.target.value),
          className: "bg-background",
          "data-ocid": `${id}-input`
        }
      )
    ] }, id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "heroIntro", children: "Introduction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "heroIntro",
          value: intro,
          onChange: (e) => setIntro(e.target.value),
          rows: 3,
          className: "bg-background resize-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "submit",
        disabled: updateHero.isPending,
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
        "data-ocid": "hero-save-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
          updateHero.isPending ? "Saving…" : "Save Hero"
        ]
      }
    )
  ] });
}
function ServicesTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateServices = useUpdateServices();
  const [services, setServices] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (content) setServices(content.services);
  }, [content]);
  const add = () => setServices([
    ...services,
    {
      id: BigInt(Date.now()),
      title: "",
      description: "",
      icon: "stethoscope",
      order: BigInt(services.length)
    }
  ]);
  const remove = (i) => setServices(services.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const next = [...services];
    next[i] = { ...next[i], [field]: value };
    setServices(next);
  };
  const handleSave = async () => {
    try {
      await updateServices.mutateAsync(services);
      ue.success("Services saved");
    } catch {
      ue.error("Failed to save");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-2xl", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: s.title,
              onChange: (e) => update(i, "title", e.target.value),
              className: "bg-background h-8 text-sm",
              "data-ocid": `service-title-${i}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: s.icon,
              onChange: (e) => update(i, "icon", e.target.value),
              className: "bg-background h-8 text-sm",
              placeholder: "e.g. stethoscope"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: s.description,
            onChange: (e) => update(i, "description", e.target.value),
            rows: 2,
            className: "bg-background text-sm resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-destructive h-7 text-xs",
          onClick: () => remove(i),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
            " Remove"
          ]
        }
      )
    ] }) }, s.id.toString())) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: add,
          "data-ocid": "add-service-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
            " Add Service"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          disabled: updateServices.isPending,
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          "data-ocid": "services-save-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
            updateServices.isPending ? "Saving…" : "Save Services"
          ]
        }
      )
    ] })
  ] });
}
function TestimonialsTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateTestimonials = useUpdateTestimonials();
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (content) setItems(content.testimonials);
  }, [content]);
  const add = () => setItems([
    ...items,
    {
      id: BigInt(Date.now()),
      name: "",
      role: "",
      text: "",
      rating: BigInt(5)
    }
  ]);
  const remove = (i) => setItems(items.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const next = [...items];
    next[i] = field === "rating" ? { ...next[i], rating: BigInt(Number(value)) } : { ...next[i], [field]: value };
    setItems(next);
  };
  const handleSave = async () => {
    try {
      await updateTestimonials.mutateAsync(items);
      ue.success("Testimonials saved");
    } catch {
      ue.error("Failed to save");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-2xl", children: items.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: t.name,
              onChange: (e) => update(i, "name", e.target.value),
              className: "bg-background h-8 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: t.role,
              onChange: (e) => update(i, "role", e.target.value),
              className: "bg-background h-8 text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Text" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: t.text,
            onChange: (e) => update(i, "text", e.target.value),
            rows: 2,
            className: "bg-background text-sm resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Rating (1-5)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            max: 5,
            value: t.rating.toString(),
            onChange: (e) => update(i, "rating", e.target.value),
            className: "bg-background h-8 text-sm w-20"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-destructive h-7 text-xs",
          onClick: () => remove(i),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
            " Remove"
          ]
        }
      )
    ] }) }, t.id.toString())) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
        " Add"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          disabled: updateTestimonials.isPending,
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          "data-ocid": "testimonials-save-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
            updateTestimonials.isPending ? "Saving…" : "Save Testimonials"
          ]
        }
      )
    ] })
  ] });
}
function FAQTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateFAQs = useUpdateFAQs();
  const [faqs, setFaqs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (content) setFaqs(content.faqs);
  }, [content]);
  const add = () => setFaqs([
    ...faqs,
    {
      id: BigInt(Date.now()),
      question: "",
      answer: "",
      order: BigInt(faqs.length)
    }
  ]);
  const remove = (i) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: value };
    setFaqs(next);
  };
  const handleSave = async () => {
    try {
      await updateFAQs.mutateAsync(faqs);
      ue.success("FAQs saved");
    } catch {
      ue.error("Failed to save");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-2xl", children: faqs.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30 border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Question" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: f.question,
            onChange: (e) => update(i, "question", e.target.value),
            className: "bg-background h-8 text-sm",
            "data-ocid": `faq-q-${i}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Answer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: f.answer,
            onChange: (e) => update(i, "answer", e.target.value),
            rows: 3,
            className: "bg-background text-sm resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-destructive h-7 text-xs",
          onClick: () => remove(i),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
            " Remove"
          ]
        }
      )
    ] }) }, f.id.toString())) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: add, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
        " Add FAQ"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          disabled: updateFAQs.isPending,
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          "data-ocid": "faq-save-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
            updateFAQs.isPending ? "Saving…" : "Save FAQs"
          ]
        }
      )
    ] })
  ] });
}
function ContactTab() {
  const { data: content, isLoading } = useSiteContent();
  const updateContact = useUpdateContactInfo();
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [hours, setHours] = reactExports.useState("");
  const [mapUrl, setMapUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (content) {
      setAddress(content.contactInfo.address);
      setPhone(content.contactInfo.phone);
      setEmail(content.contactInfo.email);
      setHours(content.contactInfo.hours);
      setMapUrl(content.contactInfo.mapUrl);
    }
  }, [content]);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateContact.mutateAsync({ address, phone, email, hours, mapUrl });
      ue.success("Contact info saved");
    } catch {
      ue.error("Failed to save");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4 max-w-xl", children: [
    [
      { id: "address", label: "Address", value: address, set: setAddress },
      { id: "cPhone", label: "Phone", value: phone, set: setPhone },
      { id: "cEmail", label: "Email", value: email, set: setEmail },
      { id: "hours", label: "Hours", value: hours, set: setHours },
      { id: "mapUrl", label: "Map Embed URL", value: mapUrl, set: setMapUrl }
    ].map(({ id, label, value, set }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          value,
          onChange: (e) => set(e.target.value),
          className: "bg-background",
          "data-ocid": `contact-${id}-input`
        }
      )
    ] }, id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "submit",
        disabled: updateContact.isPending,
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
        "data-ocid": "contact-save-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
          updateContact.isPending ? "Saving…" : "Save Contact Info"
        ]
      }
    )
  ] });
}
function AdminContentPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Site Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Edit all website sections without code changes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsList,
        {
          className: "bg-muted/40 mb-6 flex-wrap h-auto gap-1",
          "data-ocid": "content-tabs",
          children: ["hero", "services", "testimonials", "faq", "contact"].map(
            (tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: tab,
                className: "capitalize data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
                "data-ocid": `content-tab-${tab}`,
                children: tab === "faq" ? "FAQ" : tab.charAt(0).toUpperCase() + tab.slice(1)
              },
              tab
            )
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "testimonials", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "faq", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTab, {}) })
    ] }) }) })
  ] });
}
export {
  AdminContentPage as default
};
