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

import { STORAGE_KEY, TOG_CHECKLIST } from "@/lib/constants";

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

  const total = TOG_CHECKLIST.length;
  const completed = useMemo(
    () => TOG_CHECKLIST.filter((item) => checked[item.id]).length,
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
                {TOG_CHECKLIST.map((item, index) => (
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
                        checked={!!checked[item.id]}
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
