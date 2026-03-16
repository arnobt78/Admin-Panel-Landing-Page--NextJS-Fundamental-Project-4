"use client";

/**
 * Calendar page: FullCalendar with day/week/month/list views and event add/delete.
 */
import { useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { CalendarPlus } from "lucide-react";
import Header from "@/components/Header";
import type { EventClickArg, DateSelectArg } from "@fullcalendar/core";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

export default function Calendar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [pendingSelect, setPendingSelect] = useState<DateSelectArg | null>(
    null,
  );
  const [eventTitle, setEventTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<EventClickArg | null>(
    null,
  );

  // Click on empty slot: open "New Event" dialog with selected date range
  const handleDateClick = useCallback((selected: DateSelectArg) => {
    selected.view.calendar.unselect();
    setPendingSelect(selected);
    setEventTitle("");
    setEventDialogOpen(true);
  }, []);

  const handleEventSubmit = useCallback(() => {
    if (pendingSelect && eventTitle.trim()) {
      pendingSelect.view.calendar.addEvent({
        id: `${pendingSelect.startStr}-${eventTitle}`,
        title: eventTitle.trim(),
        start: pendingSelect.startStr,
        end: pendingSelect.endStr,
        allDay: pendingSelect.allDay,
      });
      setEventDialogOpen(false);
      setPendingSelect(null);
    }
  }, [pendingSelect, eventTitle]);

  // Click on event: open delete confirmation dialog
  const handleEventClick = useCallback((selected: EventClickArg) => {
    setPendingDelete(selected);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (pendingDelete) {
      pendingDelete.event.remove();
      setDeleteDialogOpen(false);
      setPendingDelete(null);
    }
  }, [pendingDelete]);

  return (
    <Box className="m-4">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Dialog
        open={eventDialogOpen}
        onClose={() => {
          setEventDialogOpen(false);
          setPendingSelect(null);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark
              ? "var(--token-primary-500)"
              : "var(--token-primary-400)",
            color: "var(--token-grey-100)",
            overflow: "visible",
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 2,
            pt: 2.5,
            color: "var(--token-grey-100)",
            bgcolor: isDark
              ? "var(--token-primary-500)"
              : "var(--token-primary-400)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <CalendarPlus className="h-5 w-5 shrink-0" />
          New Event
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: isDark
              ? "var(--token-primary-500)"
              : "var(--token-primary-400)",
            color: "var(--token-grey-100)",
            pt: 6,
            pb: 3,
            overflow: "visible",
          }}
        >
          <TextField
            autoFocus
            fullWidth
            label="Event title"
            placeholder="Enter event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEventSubmit();
            }}
            sx={{
              mt: 1,
              "& .MuiInputLabel-root": { color: "var(--token-grey-300)" },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--token-blueAccent-500)",
              },
              "& .MuiOutlinedInput-input": { color: "var(--token-grey-100)" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark
                  ? "var(--token-grey-600)"
                  : "var(--token-primary-600)",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: isDark
                    ? "var(--token-grey-500)"
                    : "var(--token-blueAccent-500)",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "var(--token-blueAccent-500)",
                },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: isDark
              ? "var(--token-primary-500)"
              : "var(--token-primary-400)",
            gap: 1,
            px: 3,
            pb: 3,
            pt: 0,
          }}
        >
          <Button
            onClick={() => {
              setEventDialogOpen(false);
              setPendingSelect(null);
            }}
            sx={{ color: "var(--token-grey-300)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEventSubmit}
            variant="contained"
            sx={{
              bgcolor: "var(--token-blueAccent-700)",
              color: isDark ? "var(--token-grey-100)" : "#fff",
              "&:hover": {
                bgcolor: isDark
                  ? "var(--token-blueAccent-600)"
                  : "var(--token-blueAccent-500)",
              },
              "&:disabled": {
                bgcolor: "var(--token-primary-600)",
                color: "var(--token-grey-500)",
              },
            }}
            disabled={!eventTitle.trim()}
          >
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setPendingDelete(null);
        }}
        PaperProps={{
          sx: {
            bgcolor: "var(--token-primary-400)",
            color: "var(--token-grey-100)",
          },
        }}
      >
        <DialogTitle sx={{ color: "var(--token-grey-100)" }}>
          Delete Event
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "var(--token-primary-400)",
            color: "var(--token-grey-200)",
          }}
        >
          {pendingDelete &&
            `Are you sure you want to delete the event "${pendingDelete.event.title}"?`}
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "var(--token-primary-400)",
            color: "var(--token-grey-100)",
          }}
        >
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setPendingDelete(null);
            }}
            sx={{ color: "var(--token-grey-300)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Box className="flex justify-between">
        <Box className="flex-[1_1_20%] bg-token-primary-400 p-4 rounded">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                className="bg-token-greenAccent-500 my-2.5 rounded-sm"
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="flex-[1_1_100%] ml-4">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => {
              setCurrentEvents(
                events.map((e) => ({
                  id: e.id,
                  title: e.title || "",
                  start: e.startStr || "",
                  end: e.endStr,
                  allDay: e.allDay,
                })),
              );
            }}
            initialEvents={[
              { id: "12315", title: "All-day event", date: "2022-09-14" },
              { id: "5123", title: "Timed event", date: "2022-09-28" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}
