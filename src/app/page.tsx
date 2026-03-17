"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AppShell,
  Box,
  Checkbox,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  Badge,
  ScrollArea,
  Container,
} from "@mantine/core";

type ChecklistItem = {
  id: string;
  eos?: string;
  tod?: string;
};

const CHECKLIST: ChecklistItem[] = [
  { id: "eos-nightfall", eos: "EOS Nightfall" },
  { id: "eos-1", eos: "EOS Ch. 1" },
  { id: "eos-2", eos: "EOS Ch. 2" },
  { id: "eos-3", eos: "EOS Ch. 3" },
  { id: "eos-4", eos: "EOS Ch. 4" },
  { id: "eos-5", eos: "EOS Ch. 5" },
  { id: "tod-1", tod: "TOD Ch. 1" },
  { id: "eos-6", eos: "EOS Ch. 6" },
  { id: "eos-7", eos: "EOS Ch. 7" },
  { id: "eos-8", eos: "EOS Ch. 8" },
  { id: "tod-2", tod: "TOD Ch. 2" },
  { id: "tod-3", tod: "TOD Ch. 3" },
  { id: "eos-9", eos: "EOS Ch. 9" },
  { id: "eos-10", eos: "EOS Ch. 10" },
  { id: "tod-4", tod: "TOD Ch. 4" },
  { id: "tod-5", tod: "TOD Ch. 5" },
  { id: "tod-6", tod: "TOD Ch. 6" },
  { id: "eos-11", eos: "EOS Ch. 11" },
  { id: "tod-7", tod: "TOD Ch. 7" },
  { id: "eos-12", eos: "EOS Ch. 12" },
  { id: "eos-13", eos: "EOS Ch. 13" },
  { id: "tod-8", tod: "TOD Ch. 8" },
  { id: "tod-9", tod: "TOD Ch. 9" },
  { id: "tod-10", tod: "TOD Ch. 10" },
  { id: "eos-14", eos: "EOS Ch. 14" },
  { id: "eos-15", eos: "EOS Ch. 15" },
  { id: "eos-16", eos: "EOS Ch. 16" },
  { id: "tod-11", tod: "TOD Ch. 11" },
  { id: "tod-12", tod: "TOD Ch. 12" },
  { id: "eos-17", eos: "EOS Ch. 17" },
  { id: "eos-18", eos: "EOS Ch. 18" },
  { id: "tod-13", tod: "TOD Ch. 13" },
  { id: "tod-14", tod: "TOD Ch. 14" },
  { id: "tod-15", tod: "TOD Ch. 15" },
  { id: "tod-16", tod: "TOD Ch. 16" },
  { id: "eos-19", eos: "EOS Ch. 19" },
  { id: "tod-17", tod: "TOD Ch. 17" },
  { id: "eos-20", eos: "EOS Ch. 20" },
  { id: "eos-21", eos: "EOS Ch. 21" },
  { id: "eos-22", eos: "EOS Ch. 22" },
  { id: "eos-23", eos: "EOS Ch. 23" },
  { id: "tod-18", tod: "TOD Ch. 18" },
  { id: "tod-19", tod: "TOD Ch. 19" },
  { id: "tod-20", tod: "TOD Ch. 20" },
  { id: "tod-21", tod: "TOD Ch. 21" },
  { id: "eos-24", eos: "EOS Ch. 24" },
  { id: "eos-25", eos: "EOS Ch. 25" },
  { id: "tod-22", tod: "TOD Ch. 22" },
  { id: "tod-23", tod: "TOD Ch. 23" },
  { id: "eos-26", eos: "EOS Ch. 26" },
  { id: "tod-24", tod: "TOD Ch. 24" },
  { id: "eos-27", eos: "EOS Ch. 27" },
  { id: "eos-28", eos: "EOS Ch. 28" },
  { id: "eos-29", eos: "EOS Ch. 29" },
  { id: "tod-25", tod: "TOD Ch. 25" },
  { id: "tod-26", tod: "TOD Ch. 26" },
  { id: "tod-27", tod: "TOD Ch. 27" },
  { id: "tod-28", tod: "TOD Ch. 28" },
  { id: "eos-30", eos: "EOS Ch. 30" },
  { id: "tod-29", tod: "TOD Ch. 29" },
  { id: "tod-30", tod: "TOD Ch. 30" },
  { id: "tod-31", tod: "TOD Ch. 31" },
  { id: "eos-31", eos: "EOS Ch. 31" },
  { id: "tod-32", tod: "TOD Ch. 32" },
];

const STORAGE_KEY = "eos-tod-tandem-progress-v1";

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore storage errors
    }
  }, [checked]);

  const total = CHECKLIST.length;
  const completed = useMemo(
    () => CHECKLIST.filter((item) => checked[item.id]).length,
    [checked]
  );
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleToggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 72 }}
      styles={{
        main: {
          paddingBottom: "env(safe-area-inset-bottom)",
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Box>
            <Title order={4}>EOS / TOD Tandem Read</Title>
            <Text size="xs" c="dimmed">
              Track chapters across both books as you go.
            </Text>
          </Box>
          <Badge variant="light">{progress}%</Badge>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm" px="xs">
          <Stack gap="sm">
            <Box>
              <Text size="sm" c="dimmed">
                This checklist follows the popular tandem reading guide for{" "}
                <Text span fw={600}>
                  Empire of Storms
                </Text>{" "}
                and{" "}
                <Text span fw={600}>
                  Tower of Dawn
                </Text>
                . Your progress is saved on this device.
              </Text>
            </Box>

            <Box>
              <Group justify="space-between" mb={4}>
                <Text size="sm" fw={500}>
                  Overall progress
                </Text>
                <Text size="xs" c="dimmed">
                  {completed} / {total} steps
                </Text>
              </Group>
              <Progress value={progress} size="lg" radius="xl" />
            </Box>

            <ScrollArea h="calc(100vh - 220px)" offsetScrollbars>
              <Stack gap="xs" py="xs">
                {CHECKLIST.map((item, index) => (
                  <Box
                    key={item.id}
                    px="xs"
                    py={8}
                    style={(theme) => ({
                      borderRadius: theme.radius.md,
                      border: `1px solid ${
                        theme.colors.dark[6]
                      }`,
                      backgroundColor: theme.colors.dark[7],
                    })}
                  >
                    <Group gap="sm" align="flex-start" wrap="nowrap">
                      <Checkbox
                        checked={!!checked[item.id]}/*  */
                        onChange={() => handleToggle(item.id)}
                        aria-label={`Mark step ${index + 1} complete`}
                      />
                      <Box style={{ flex: 1 }}>
                        <Group gap={6} mt={4} wrap="wrap">
                          {item.eos && (
                            <Badge color="grape" variant="light" radius="sm">
                              {item.eos}
                            </Badge>
                          )}
                          {item.tod && (
                            <Badge color="cyan" variant="light" radius="sm">
                              {item.tod}
                            </Badge>
                          )}
                        </Group>
                      </Box>
                    </Group>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
