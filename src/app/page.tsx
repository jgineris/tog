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
  Container,
  SegmentedControl,
} from "@mantine/core";

import {
  STORAGE_KEY,
  TITLE_MODE_STORAGE_KEY,
  TOG_CHECKLIST,
} from "@/lib/constants";

export default function Home() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [titleMode, setTitleMode] = useState<"short" | "full">("short");

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(TITLE_MODE_STORAGE_KEY);
      if (stored === "short" || stored === "full") {
        setTitleMode(stored);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(TITLE_MODE_STORAGE_KEY, titleMode);
    } catch {
      // ignore storage errors
    }
  }, [titleMode]);

  const total = TOG_CHECKLIST.length;
  const completed = useMemo(
    () => TOG_CHECKLIST.filter((item) => checked[item.id]).length,
    [checked]
  );
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleToggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatLabel = (raw: string, book: "eos" | "tod") => {
    if (titleMode === "short") return raw;
    if (book === "eos") {
      return raw.replace("EOS", "Empire of Storms");
    }
    return raw.replace("TOD", "Tower of Dawn");
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 72 }}
    // styles={{
    //   main: {
    //     paddingBottom: "env(safe-area-inset-bottom)",
    //   },
    // }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Box>
            <Title order={4}>Empire of Storms and Tower of Dawn Tandem Read</Title>
            <Text size="xs" c="dimmed">
              Track chapters across both books as you go.
            </Text>
          </Box>

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
              <Group align="center">
                <Text size="sm" fw={700}>
                  Title style
                </Text>
                <SegmentedControl
                  value={titleMode}
                  onChange={(value) =>
                    setTitleMode(value as "short" | "full")
                  }
                  data={[
                    { label: "Shortened title", value: "short" },
                    { label: "Full title", value: "full" },
                  ]}
                  size="sm"
                  radius="xl"
                  classNames={{ label: "tog-title-mode-label" }}
                  styles={(theme) => ({
                    root: {
                      padding: 2,
                      backgroundColor: theme.colors.dark[5],
                    },
                    indicator: {
                      boxShadow: theme.shadows.xs,
                      backgroundImage: `linear-gradient(45deg, ${theme.colors.grape[5]}, ${theme.colors.cyan[5]})`,
                    },
                    label: {
                      fontSize: theme.fontSizes.xs,
                      color: theme.white,
                    },
                  })}
                />
              </Group>
            </Box>

            <Box>
              <Group justify="space-between" mb={4}>
                <Group gap={0} align="center">
                  <Text size="sm" fw={500}>
                    Overall progress
                  </Text>
                  <Badge variant="light" ml={10}>
                    {progress}%
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                  {completed} / {total} chapters
                </Text>
              </Group>
              <Progress value={progress} size="lg" radius="xl" />
            </Box>
            <Stack gap="xs" py="xs">
              {TOG_CHECKLIST.map((item, index) => (
                <Box
                  key={item.id}
                  px="xs"
                  py={8}
                  style={(theme) => ({
                    borderRadius: theme.radius.md,
                    border: `1px solid ${theme.colors.dark[6]
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
                            {formatLabel(item.eos, "eos")}
                          </Badge>
                        )}
                        {item.tod && (
                          <Badge color="orange" variant="light" radius="sm">
                            {formatLabel(item.tod, "tod")}
                          </Badge>
                        )}
                      </Group>
                    </Box>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
