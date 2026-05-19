// shared/schema.ts
// ============================================================
// Campus Intelligence System — Complete Database Schema
// ORM: Drizzle | DB: PostgreSQL
// ============================================================

import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", [
  "admin",
  "security_guard",
  "hostel_warden",
  "faculty",
  "hod",
  "student",
  "guest_faculty",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const visitorStatusEnum = pgEnum("visitor_status", [
  "pending_approval",
  "approved",
  "inside",
  "exited",
  "rejected",
  "expired",
]);

export const passStatusEnum = pgEnum("pass_status", [
  "pending",
  "approved",
  "rejected",
  "active",
  "returned",
  "late_return",
  "expired",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const gateEnum = pgEnum("gate", [
  "main_gate",
  "hostel_gate",
  "side_gate",
]);

export const directionEnum = pgEnum("direction", ["in", "out"]);

export const alertTypeEnum = pgEnum("alert_type", [
  "student_missing",
  "late_return",
  "visitor_unresponded",
  "unauthorized_entry",
  "hall_conflict",
  "gate_pass_overdue",
]);

export const alertSeverityEnum = pgEnum("alert_severity", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    email: varchar("email", { length: 200 }).unique(),
    phone: varchar("phone", { length: 15 }).notNull(),
    role: roleEnum("role").notNull(),
    gender: genderEnum("gender"),
    departmentId: integer("department_id").references(() => departments.id),
    biometricId: varchar("biometric_id", { length: 100 }).unique(),
    rfidTag: varchar("rfid_tag", { length: 100 }).unique(),
    isHostelite: boolean("is_hostelite").default(false),
    roomNumber: varchar("room_number", { length: 20 }),
    parentPhone: varchar("parent_phone", { length: 15 }),
    photoUrl: varchar("photo_url", { length: 500 }),
    isActive: boolean("is_active").default(true),
    passwordHash: varchar("password_hash", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    biometricIdx: index("users_biometric_idx").on(table.biometricId),
    roleIdx: index("users_role_idx").on(table.role),
  })
);

export const visitors = pgTable(
  "visitors",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 15 }).notNull(),
    email: varchar("email", { length: 200 }),
    hostUserId: integer("host_user_id").references(() => users.id),
    purpose: text("purpose").notNull(),
    vehicleNumber: varchar("vehicle_number", { length: 20 }),
    photoUrl: varchar("photo_url", { length: 500 }),
    qrCode: varchar("qr_code", { length: 300 }).unique(),
    passExpiresAt: timestamp("pass_expires_at"),
    status: visitorStatusEnum("status").default("pending_approval"),
    entryTime: timestamp("entry_time"),
    exitTime: timestamp("exit_time"),
    approvedBy: integer("approved_by").references(() => users.id),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    phoneIdx: index("visitors_phone_idx").on(table.phone),
    statusIdx: index("visitors_status_idx").on(table.status),
    qrIdx: uniqueIndex("visitors_qr_idx").on(table.qrCode),
  })
);

export const biometricLogs = pgTable(
  "biometric_logs",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    gate: gateEnum("gate").notNull(),
    direction: directionEnum("direction").notNull(),
    timestamp: timestamp("timestamp").defaultNow(),
    deviceId: varchar("device_id", { length: 100 }),
    isManualOverride: boolean("is_manual_override").default(false),
    overrideBy: integer("override_by").references(() => users.id),
    notes: text("notes"),
  },
  (table) => ({
    userIdIdx: index("bio_logs_user_idx").on(table.userId),
    timestampIdx: index("bio_logs_timestamp_idx").on(table.timestamp),
    gateIdx: index("bio_logs_gate_idx").on(table.gate),
  })
);

export const gatePasses = pgTable(
  "gate_passes",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull().references(() => users.id),
    reason: text("reason").notNull(),
    destination: varchar("destination", { length: 300 }).notNull(),
    expectedOutTime: timestamp("expected_out_time").notNull(),
    expectedReturnTime: timestamp("expected_return_time").notNull(),
    actualOutTime: timestamp("actual_out_time"),
    actualReturnTime: timestamp("actual_return_time"),
    approvedBy: integer("approved_by").references(() => users.id),
    approvedAt: timestamp("approved_at"),
    rejectionReason: text("rejection_reason"),
    qrCode: varchar("qr_code", { length: 300 }).unique(),
    status: passStatusEnum("status").default("pending"),
    parentNotified: boolean("parent_notified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    studentIdx: index("gate_passes_student_idx").on(table.studentId),
    statusIdx: index("gate_passes_status_idx").on(table.status),
  })
);

export const halls = pgTable("halls", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  capacity: integer("capacity").notNull(),
  location: varchar("location", { length: 200 }),
  amenities: text("amenities"),
  isActive: boolean("i
