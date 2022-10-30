import { createLogger, format, transports, config } from "winston";
const { combine, timestamp, json } = format;

export const apodLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: "user-service" },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});
