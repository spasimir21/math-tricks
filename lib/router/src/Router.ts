import { Effect, Reactive, reactive } from 'reactivity';
import { GotoLocation, gotoLocation } from './goto';
import { UixComponent, context } from 'uix';
import {
  ProcessedRouteDefinition,
  Route,
  RouteComponent,
  RouteDefinition,
  getRouteComponentNodeName,
  matchLocationToRoute,
  processRouteDefinition
} from './routes';

@Reactive
class Router {
  public readonly route: Route = reactive({}) as any;

  private readonly routeDefinitions: Record<string, ProcessedRouteDefinition> = {};
  private readonly fallbackComponent: string;

  private currentComponent: UixComponent = document.createComment('') as any;
  private context: any = {};

  constructor(
    routeDefinitions: RouteDefinition[],
    context?: any,
    fallbackComponent: RouteComponent = 'router--fallback'
  ) {
    for (const routeDefinition of routeDefinitions) processRouteDefinition(routeDefinition, '', this.routeDefinitions);

    this.fallbackComponent = getRouteComponentNodeName(fallbackComponent);
    this.context = context ?? this.context;
    this.updateRoute();

    window.addEventListener('popstate', this.updateRoute.bind(this));
  }

  bindTo(element: HTMLElement) {
    element.replaceWith(this.currentComponent);
  }

  goto(location: GotoLocation) {
    gotoLocation(location, this.routeDefinitions);
    this.updateRoute();
  }

  refresh() {
    this.updateComponent();
  }

  private updateRoute() {
    const newRoute = matchLocationToRoute(window.location, this.routeDefinitions, this.fallbackComponent);
    for (const key in newRoute) this.route[key as keyof Route] = newRoute[key as keyof Route] as any;
  }

  @Effect<Router>(router => router.route.component)
  private updateComponent() {
    const newComponent = document.createElement(this.route.component) as UixComponent;

    newComponent.context = context(newComponent.context, this.context);
    newComponent.context.route = this.route;
    newComponent.context.router = this;

    newComponent.allowInitialization();

    this.currentComponent.replaceWith(newComponent);
    this.currentComponent = newComponent;
  }

  @Effect
  private updatePageTitle() {
    if (this.route.title == null) return;
    document.title = this.route.title;
  }
}

export { Router };
