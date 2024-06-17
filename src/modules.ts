import { Express } from "express";
import { GlobalRoutes } from "./decorators";
import { AuthController } from "./useCases/Auth/auth.controller";
import { AuthRoutes } from "./useCases/Auth/auth.route";
import { ProfileRoutes } from "./useCases/Profile/profile.route";
import { SportsRoutes } from "./useCases/Sports/sports.route";
import { MediaRoutes } from "./useCases/Media/Media.route";
import { AppointmentsRoutes } from "./useCases/Appointments/appointments.route";
import { NotificationsController } from "./useCases/Notifications/notifications.controller";
import { NotificationsRoutes } from "./useCases/Notifications/notifications.route";

@GlobalRoutes([AuthRoutes, ProfileRoutes, SportsRoutes, MediaRoutes, AppointmentsRoutes, NotificationsRoutes])
export class AppGlobalRoutes {
  startModule(app: Express): void {}
}


