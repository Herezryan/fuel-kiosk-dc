import { Container, Grid, SimpleGrid, Skeleton } from '@mantine/core';

const PRIMARY_COL_HEIGHT = '300px';

export function LeadGrid({ 
  primaryContent, 
  secondaryTopContent, 
  secondaryBottomLeftContent, 
  secondaryBottomRightContent 
}) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Primary Column */}
        <div style={{ height: PRIMARY_COL_HEIGHT }}>
          {primaryContent || <Skeleton height="100%" radius="md" animate={false} />}
        </div>

        {/* Secondary Column */}
        <Grid gutter="md">
          {/* Secondary Top */}
          <Grid.Col>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryTopContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>

          {/* Secondary Bottom Left */}
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryBottomLeftContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>

          {/* Secondary Bottom Right */}
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              {secondaryBottomRightContent || <Skeleton height="100%" radius="md" animate={false} />}
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}