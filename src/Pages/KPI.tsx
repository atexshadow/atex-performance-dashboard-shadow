 import React from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// Existing charts
import MixedChart from "../Charts/MixedChart";
import PieChart from "../Charts/PieChart";
import DoughnutChart from "../Charts/DoughnutChart";
import BarChart from "../Charts/BarChart";
import ScatterChart from "../Charts/ScatterChart";
// ✅ New charts
import LineChart from "../Charts/LineChart";
import PolarChart from "../Charts/PolarChart";
import FloatingLineChart from "../Charts/FloatingLineChart";
// ---- MUI X Date Picker ----
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
// -----------------------------
// Types and sample data
// -----------------------------
type ScatterPoint = { x: number; y: number };
type ScatterDataset = {
  label: string;
  data: ScatterPoint[];
  color?: string;
  pointColor?: string;
};
const fmtKey = (d: Dayjs) => d.format("YYYY-MM-DD");
const RANGE_START = dayjs("2025-12-05");
const RANGE_END = dayjs("2025-12-17");
const inRange = (d: Dayjs) =>
  !d.isBefore(RANGE_START, "day") && !d.isAfter(RANGE_END, "day");
// demo data mapped by date (Dec 5 / 10 / 12 / 17)
const dataByDate: Record<
  string,
  {
    mixed: { labels: string[]; barValues: number[]; lineValues: number[] };
    pie: { labels: string[]; values: number[]; colors?: string[] };
    doughnut: { labels: string[]; values: number[]; colors?: string[] };
    bar: { labels: string[]; data: number[]; title?: string; color?: string };
    scatter: {
      datasets: ScatterDataset[];
      title?: string;
      xLabel?: string;
      yLabel?: string;
    };
    polar?: { labels: string[]; values: number[] };
    floatingLine?: { labels: string[]; values: number[]; title?: string; color?: string };
    line?: { labels: string[]; values: number[]; title?: string; color?: string };
  }
> = {
  "2025-12-05": {
    mixed: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      barValues: [80, 95, 100, 120, 110, 130],
      lineValues: [90, 100, 105, 130, 125, 140],
    },
    pie: {
      labels: ["Mechanical", "Electrical", "Software", "Other"],
      values: [40, 30, 20, 10],
      colors: ["#1e88e5", "#43a047", "#fb8c00", "#8e24aa"],
    },
    doughnut: {
      labels: ["Planned", "Unplanned", "Idle"],
      values: [55, 30, 15],
      colors: ["#2e7d32", "#c62828", "#f9a825"],
    },
    bar: {
      labels: ["Shift A", "Shift B", "Shift C"],
      data: [320, 280, 360],
      title: "Output by Shift",
      color: "#42a5f5",
    },
    scatter: {
      datasets: [
        { label: "Team Alpha", data: [{ x: 6, y: 72 }, { x: 7, y: 75 }, { x: 8, y: 78 }], color: "#1976d2" },
        { label: "Team Beta", data: [{ x: 6, y: 68 }, { x: 7, y: 70 }, { x: 8, y: 74 }], color: "#ef5350" },
      ],
      title: "Capacity vs Utilization",
      xLabel: "Capacity (hours)",
      yLabel: "Utilization (%)",
    },
  },
  "2025-12-10": {
    mixed: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      barValues: [88, 96, 102, 118, 122, 135],
      lineValues: [92, 105, 110, 128, 132, 145],
    },
    pie: { labels: ["Mechanical", "Electrical", "Software", "Other"], values: [38, 32, 20, 10] },
    doughnut: { labels: ["Planned", "Unplanned", "Idle"], values: [58, 27, 15] },
    bar: { labels: ["Shift A", "Shift B", "Shift C"], data: [300, 295, 340], title: "Output by Shift", color: "#66bb6a" },
    scatter: {
      datasets: [
        { label: "Team Alpha", data: [{ x: 6, y: 70 }, { x: 7, y: 73 }, { x: 8, y: 76 }], color: "#1976d2" },
        { label: "Team Beta", data: [{ x: 6, y: 69 }, { x: 7, y: 71 }, { x: 8, y: 73 }], color: "#ef5350" },
      ],
      title: "Capacity vs Utilization",
      xLabel: "Capacity (hours)",
      yLabel: "Utilization (%)",
    },
  },
  "2025-12-12": {
    mixed: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      barValues: [90, 110, 95, 120, 130, 140],
      lineValues: [100, 120, 110, 130, 140, 150],
    },
    pie: { labels: ["Mechanical", "Electrical", "Software", "Other"], values: [35, 30, 20, 15] },
    doughnut: { labels: ["Planned", "Unplanned", "Idle"], values: [60, 25, 15] },
    bar: { labels: ["Shift A", "Shift B", "Shift C"], data: [310, 300, 355], title: "Output by Shift", color: "#ab47bc" },
    scatter: {
      datasets: [
        { label: "Team Alpha", data: [{ x: 6, y: 71 }, { x: 7, y: 74 }, { x: 8, y: 77 }], color: "#1976d2" },
        { label: "Team Beta", data: [{ x: 6, y: 67 }, { x: 7, y: 70 }, { x: 8, y: 72 }], color: "#ef5350" },
      ],
      title: "Capacity vs Utilization",
      xLabel: "Capacity (hours)",
      yLabel: "Utilization (%)",
    },
  },
  "2025-12-17": {
    mixed: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      barValues: [95, 115, 105, 130, 140, 150],
      lineValues: [105, 125, 115, 140, 150, 165],
    },
    pie: { labels: ["Mechanical", "Electrical", "Software", "Other"], values: [42, 28, 20, 10] },
    doughnut: { labels: ["Planned", "Unplanned", "Idle"], values: [62, 23, 15] },
    bar: { labels: ["Shift A", "Shift B", "Shift C"], data: [330, 315, 370], title: "Output by Shift", color: "#ffa726" },
    scatter: {
      datasets: [
        { label: "Team Alpha", data: [{ x: 6, y: 73 }, { x: 7, y: 76 }, { x: 8, y: 79 }], color: "#1976d2" },
        { label: "Team Beta", data: [{ x: 6, y: 68 }, { x: 7, y: 72 }, { x: 8, y: 74 }], color: "#ef5350" },
      ],
      title: "Capacity vs Utilization",
      xLabel: "Capacity (hours)",
      yLabel: "Utilization (%)",
    },
  },
};
// Month name map for parsing queries like "12 Dec"
const MONTH_MAP: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};
// layout helpers for cards (compact heights to avoid scrolling)
const cardSx = {
  calendar: {
    p: 1.25,
    borderRadius: 2,
    flex: "0 0 300px",
    minWidth: 280,
    height: 250,
    display: "flex",
    flexDirection: "column",
  },
  narrow: {
    p: 1.25,
    borderRadius: 2,
    flex: "1 1 300px",
    minWidth: 280,
    height: 220,
    display: "flex",
    flexDirection: "column",
  },
  medium: {
    p: 1.25,
    borderRadius: 2,
    flex: "1 1 360px",
    minWidth: 320,
    height: 220,
    display: "flex",
    flexDirection: "column",
  },
  wide: {
    p: 1.25,
    borderRadius: 2,
    flex: "2 1 520px",
    minWidth: 420,
    height: 220,
    display: "flex",
    flexDirection: "column",
  },
  wideBottom: {
    p: 1.25,
    borderRadius: 2,
    flex: "2 1 560px",
    minWidth: 480,
    height: 220,
    display: "flex",
    flexDirection: "column",
  },
} as const;
const KPI: React.FC = () => {
  /** Single selected date, keep calendar in sync */
  const [activeDate, setActiveDate] = React.useState<Dayjs>(RANGE_START);
  const [visibleMonth, setVisibleMonth] = React.useState<Dayjs>(activeDate);
  // Search
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  /** Parse search input → Dayjs */
  const parseSearchToDate = (q: string): Dayjs | null => {
    const s = q.trim().toLowerCase();
    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      const d = dayjs(s);
      return d.isValid() ? d : null;
    }
    // DD (assume current visible month)
    if (/^\d{1,2}$/.test(s)) {
      const dd = parseInt(s, 10);
      const tentative = dayjs(new Date(visibleMonth.year(), visibleMonth.month(), dd));
      return tentative.isValid() ? tentative : null;
    }
    // "DD mon" or "mon DD"
    const ddMon = s.match(/^(\d{1,2})\s+([a-z]{3,})$/);
    const monDd = s.match(/^([a-z]{3,})\s+(\d{1,2})$/);
    if (ddMon || monDd) {
      const dd = parseInt(ddMon ? ddMon[1] : monDd![2], 10);
      const monStr = (ddMon ? ddMon[2] : monDd![1]).slice(0, 3);
      const mon = MONTH_MAP[monStr] ?? -1;
      if (mon >= 0) {
        const tentative = dayjs(new Date(visibleMonth.year(), mon, dd));
        return tentative.isValid() ? tentative : null;
      }
    }
    return null;
  };
  const handleSearch = () => {
    const parsed = parseSearchToDate(query);
    if (parsed && inRange(parsed)) {
      setActiveDate(parsed);
      setVisibleMonth(parsed);
      setError(null);
    } else {
      setError("Enter a valid date within Dec 5–17, 2025.");
    }
  };
  // Custom calendar day cell — NOTE: PickersDayProps is NOT generic in your version
  const CustomDay = (props: PickersDayProps) => {
    const day = props.day as Dayjs;
    const disabled = !inRange(day);
    const isSelected = activeDate.isSame(day, "day");
    return (
<PickersDay
        {...props}
        disabled={disabled || props.disabled}
        onClick={() => {
          if (disabled) return;
          setActiveDate(day);
          setVisibleMonth(day);
          setError(null);
        }}
        sx={{
          mx: 0.35,
          my: 0.35,
          width: 37,
          height: 37,
          lineHeight: "39px",
          borderRadius: "19px",
          fontSize: "0.85rem",
          ...(isSelected
            ? {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
              }
            : {
                "&:hover": { bgcolor: "action.hover" },
              }),
          ...(disabled
            ? { opacity: 0.35, cursor: "not-allowed" }
            : { cursor: "pointer" }),
        }}
      />
    );
  };
  // Data for selected date (fallback when missing)
  const resolved = dataByDate[fmtKey(activeDate)] ?? {
    mixed:   { labels: ["Jan","Feb","Mar","Apr","May","Jun"], barValues: [0,0,0,0,0,0], lineValues: [0,0,0,0,0,0] },
    pie:     { labels: ["Mechanical","Electrical","Software","Other"], values: [0,0,0,0] },
    doughnut:{ labels: ["Planned","Unplanned","Idle"], values: [0,0,0] },
    bar:     { labels: ["Shift A","Shift B","Shift C"], data: [0,0,0], title: "Output by Shift", color: "#42a5f5" },
    scatter: {
      datasets: [
        { label: "Team Alpha", data: [], color: "#1976d2" },
        { label: "Team Beta",  data: [], color: "#ef5350" },
      ],
      title: "Capacity vs Utilization",
      xLabel: "Capacity (hours)",
      yLabel: "Utilization (%)",
    },
  };
  // Derived props for the NEW charts
  const lineLabels   = resolved.line?.labels   ?? resolved.mixed.labels;
  const lineValues   = resolved.line?.values   ?? resolved.mixed.lineValues;
  const lineTitle    = resolved.line?.title    ?? "Trend (Line)";
  const lineColor    = resolved.line?.color    ?? "#4D96FF";
  const polarLabels  = resolved.polar?.labels  ?? resolved.pie.labels;
  const polarValues  = resolved.polar?.values  ?? resolved.pie.values;
  const floatingLabels = resolved.floatingLine?.labels ?? resolved.mixed.labels;
  const floatingValues = resolved.floatingLine?.values ?? resolved.mixed.lineValues;
  const floatingTitle  = resolved.floatingLine?.title  ?? "Production vs Target (Floating Line)";
  const floatingColor  = resolved.floatingLine?.color  ?? "#1C86EE";
  // Doughnut center text (e.g., "53% Planned")
  const doughnutSum = resolved.doughnut.values.reduce((a, b) => a + b, 0) || 1;
  const plannedPct  = Math.round((resolved.doughnut.values[0] / doughnutSum) * 100);
  return (
<Container
      maxWidth="xl"
      sx={{
        py: 1,
        height: "100vh",            // fit to viewport
        overflow: "hidden",         // no page scrolling
        display: "flex",
        flexDirection: "column",
      }}
>
      {/* Header + Search (compact) */}
<Box
        sx={{
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flex: "0 0 auto",
        }}
>
<Box>
<Typography variant="h6" fontWeight={700}>
            KPI Dashboard
</Typography>
<Typography variant="caption" color="text.secondary">
            Showing data for <strong>{activeDate.format("MMM D, YYYY")}</strong> (Dec 5–17, 2025)
</Typography>
          {error && (
<Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
              {error}
</Typography>
          )}
</Box>
        {/* Search bar */}
<Box
          sx={{
            px: 1.25,
            py: 0.6,
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 280,
          }}
>
<SearchIcon color="action" fontSize="small" />
<InputBase
            placeholder='e.g., "12", "12 Dec", or "2025-12-12"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            fullWidth
            sx={{ fontSize: "0.9rem" }}
          />
</Box>
</Box>
      {/* Canvas (flex-only) — three rows, single screen */}
<Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "stretch",
          flex: "1 1 auto",
          overflow: "hidden",
        }}
>
        {/* ROW 1: Calendar (narrow), Mixed (wide), Pie (narrow) */}
<Paper sx={cardSx.calendar} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Calendar
</Typography>
<Typography variant="caption" color="text.secondary">
              Pick a date (Dec 5–17)
</Typography>
</Box>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DateCalendar
              value={activeDate}
              onChange={(d) => {
                if (!d || !inRange(d)) return;
                setActiveDate(d);
                setVisibleMonth(d);
                setError(null);
              }}
              slots={{ day: CustomDay as any }}
              showDaysOutsideCurrentMonth
              disableHighlightToday
              minDate={RANGE_START}
              maxDate={RANGE_END}
              shouldDisableDate={(d) => !inRange(d)}
              sx={{
                "& .MuiPickersCalendarHeader-root": { px: 1 },
                "& .MuiPickersDay-root": { margin: "3px" },
              }}
            />
</LocalizationProvider>
</Paper>
<Paper sx={cardSx.wide} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Production vs Target — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Monthly comparison
</Typography>
</Box>
<MixedChart
            labels={resolved.mixed.labels}
            barValues={resolved.mixed.barValues}
            lineValues={resolved.mixed.lineValues}
            barColor="rgba(66, 165, 245, 0.6)"
            lineColor="rgba(255, 99, 132, 0.9)"
            height={180}          // compact to avoid scroll
            stacked={false}
            showSecondaryAxis
          />
</Paper>
<Paper sx={cardSx.narrow} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Failure Modes — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Mechanical vs Electrical vs Software
</Typography>
</Box>
<PieChart
            labels={resolved.pie.labels}
            values={resolved.pie.values}
            colors={resolved.pie.colors ?? ["#1e88e5", "#43a047", "#fb8c00", "#8e24aa"]}
            height={180}
          />
</Paper>
        {/* ROW 2: Doughnut (medium), Bar (narrow), Scatter (wide) */}
<Paper sx={cardSx.medium} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Time Allocation — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Planned vs Unplanned vs Idle
</Typography>
</Box>
<DoughnutChart
            labels={resolved.doughnut.labels}
            values={resolved.doughnut.values}
            colors={resolved.doughnut.colors ?? ["#2e7d32", "#c62828", "#f9a825"]}
            height={180}
            centerText={`${Math.round((resolved.doughnut.values[0] / (resolved.doughnut.values.reduce((a,b)=>a+b,0)||1)) * 100)}% Planned`}
          />
</Paper>
<Paper sx={cardSx.narrow} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Output by Shift — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Shift-wise output
</Typography>
</Box>
<BarChart
            labels={resolved.bar.labels}
            data={resolved.bar.data}
            title={resolved.bar.title ?? "Output by Shift"}
            color={resolved.bar.color ?? "#42a5f5"}
            height={180}
            barThickness={20}
          />
</Paper>
<Paper sx={cardSx.wide} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Capacity vs Utilization — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Teams comparison
</Typography>
</Box>
<ScatterChart
            datasets={resolved.scatter.datasets}
            title={resolved.scatter.title}
            height={180}
            xLabel={resolved.scatter.xLabel}
            yLabel={resolved.scatter.yLabel}
          />
</Paper>
        {/* ROW 3: NEW Line (narrow), NEW Polar (narrow), NEW Floating Line (wide) */}
<Paper sx={cardSx.narrow} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Trend (Line) — {activeDate.format("MMM")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Plain line visualization
</Typography>
</Box>
<LineChart
            labels={lineLabels}
            data={lineValues}
            title={lineTitle}
            color={lineColor}
            height={180}
            tension={0.35}
            fill={false}
            showPoints
          />
</Paper>
<Paper sx={cardSx.narrow} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Failure Mix (Polar) — {activeDate.format("MMM D")}
</Typography>
<Typography variant="caption" color="text.secondary">
              Polar area distribution
</Typography>
</Box>
<PolarChart
            labels={polarLabels}
            data={polarValues}
            title={`Total: ${polarValues.reduce((a, b) => a + b, 0)}`}
            height={180}
          />
</Paper>
<Paper sx={cardSx.wideBottom} elevation={2}>
<Box sx={{ mb: 0.5 }}>
<Typography variant="subtitle2" fontWeight={600}>
              Production vs Target — Floating Line
</Typography>
<Typography variant="caption" color="text.secondary">
              Monthly comparison (floating effect)
</Typography>
</Box>
<FloatingLineChart
            labels={floatingLabels}
            data={floatingValues}
            title={floatingTitle}
            color={floatingColor}
            height={180}
          />
</Paper>
</Box>
</Container>
  );
};
export default KPI;