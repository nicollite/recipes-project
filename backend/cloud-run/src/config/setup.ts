import "./env";
import { install } from "source-map-support";
import admin from "firebase-admin";

// Use source map support
install();

admin.initializeApp();
