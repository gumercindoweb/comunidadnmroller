# Graph Report - .  (2026-07-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 847 nodes · 1273 edges · 125 communities (60 shown, 65 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39aec078`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112

## God Nodes (most connected - your core abstractions)
1. `cn()` - 70 edges
2. `Button` - 20 edges
3. `useScrollAnimation()` - 19 edges
4. `compilerOptions` - 19 edges
5. `compilerOptions` - 14 edges
6. `DialogContent` - 11 edges
7. `sedes` - 11 edges
8. `DialogTitle` - 10 edges
9. `Input` - 10 edges
10. `getProximaMasterclass()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `useToast()` --references--> `react`  [EXTRACTED]
  src/hooks/use-toast.ts → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (125 total, 65 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (37): CountdownBanner(), Props, TimeRemaining, ventaHastaTexto(), Footer(), Window, MasterclassFooterBanner(), MasterclassPopup() (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (21): queryClient, Bullets(), LegalLayout(), LegalLayoutProps, Section(), ScrollToTop(), Toaster(), ToasterProps (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (24): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (25): Separator, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel (+17 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (25): DOM, DOM.Iterable, ES2020, src, vitest/globals, compilerOptions, allowImportingTsExtensions, isolatedModules (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (20): badgeDescriptions, badgeStyles, ClaseEnriquecida, dias, disciplinasDisponibles, disciplinasPorIdentidad(), horarios, HorariosSection() (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (14): schema, findChannelId(), notifySlack(), NotifySlackOptions, slackGatewayFetch(), WEBHOOK_SECRETS, corsHeaders, Payload (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (15): AlquilerHorariosGrid(), buildHorarios(), alquilerSedes, AlquilerSedesGrid(), stats, ClaseCard(), ClaseDayCard(), makeIcon() (+7 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (13): NavLink, NavLinkCompatProps, Checkbox, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, PopoverContent (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (17): buildPlanWa(), Plan, PLANES, PlanesSportclub(), PlanesSportclubProps, scrollTo(), UserData, wa() (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.21
Nodes (10): AppSection(), features, ForWhom(), points, SedesSection(), testimonials, ValueProposition(), REELS (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (15): ClaseDia, DIAS, PERFILES, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (17): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (13): AlquilerPlan, plans, PricingAlquilerSection(), navLinks, monthlyPlans, Period, Plan, PricingSection() (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.18
Nodes (7): FormSchema, Input, supabase, benefits, FormSchema, FormSchema, NIVELES

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (12): ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (12): buildPasos(), buildWaEnviarDatos(), ClaseGratisConfirmada(), despues, FormState, getDeadline(), pad(), Paso (+4 more)

### Community 18 - "Community 18"
Cohesion: 0.21
Nodes (9): AccordionContent, AccordionItem, AccordionTrigger, faq, incluye, pasos, FaqItem, FaqSection (+1 more)

### Community 19 - "Community 19"
Cohesion: 0.15
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.15
Nodes (13): autoprefixer, globals, devDependencies, autoprefixer, globals, @testing-library/jest-dom, @types/react, typescript (+5 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (10): BADGE_DESC, BADGE_STYLES, ClaseGratis(), DIAS_SEMANA, EQUIPO_OPCIONES, FormSchema, HORARIOS_CLASES, IDENTIDADES (+2 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (12): class-variance-authority, dependencies, class-variance-authority, @radix-ui/react-alert-dialog, @radix-ui/react-context-menu, @radix-ui/react-progress, @radix-ui/react-tabs, @radix-ui/react-toast (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (9): EquipoPropioNota(), ALQUILER_OPCIONES, BENEFICIOS, FormSchema, PERFILES, PLANES_SPORTCLUB, SPORTCLUB_HORARIOS, sportclubSedes (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (7): HoverCardContent, ResizableHandle(), ResizablePanelGroup(), Skeleton(), Slider, Switch, cn()

### Community 26 - "Community 26"
Cohesion: 0.17
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 27 - "Community 27"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (10): compilerOptions, allowJs, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck, strictNullChecks (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (7): DIAS, FRANJAS, Props, schema, DialogDescription, Textarea, TextareaProps

### Community 30 - "Community 30"
Cohesion: 0.20
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 31 - "Community 31"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 32 - "Community 32"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.22
Nodes (8): react, react, useCarousel(), useChart(), useFormField(), SidebarContext, useSidebar(), useIsMobile()

### Community 34 - "Community 34"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 35 - "Community 35"
Cohesion: 0.22
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, preview, test, test:watch

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 39 - "Community 39"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 41 - "Community 41"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 42 - "Community 42"
Cohesion: 0.47
Nodes (4): FlyFreePanel(), ACCEPTED, PagoConfirmado(), PLAN_LABELS

### Community 43 - "Community 43"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 45 - "Community 45"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **440 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+435 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 23` to `Community 33`, `Community 43`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 59`, `Community 60`, `Community 62`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 74`, `Community 75`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`, `Community 83`, `Community 84`, `Community 85`, `Community 86`, `Community 87`, `Community 88`, `Community 89`, `Community 90`, `Community 91`, `Community 92`, `Community 93`, `Community 94`, `Community 95`, `Community 96`, `Community 97`, `Community 98`, `Community 99`, `Community 100`, `Community 101`?**
  _High betweenness centrality (0.287) - this node is a cross-community bridge._
- **Why does `react` connect `Community 33` to `Community 2`, `Community 23`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 25` to `Community 0`, `Community 2`, `Community 3`, `Community 5`, `Community 8`, `Community 11`, `Community 13`, `Community 15`, `Community 16`, `Community 18`, `Community 19`, `Community 21`, `Community 26`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 34`, `Community 35`, `Community 36`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 44`, `Community 45`, `Community 46`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _440 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05779220779220779 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07207207207207207 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._