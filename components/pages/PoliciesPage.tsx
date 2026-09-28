'use client';

import { useState } from 'react';
import { FileText, Info } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POLICIES, POLICY_KEYS } from '@/lib/policies';
import type { PolicyKey } from '@/lib/types';

export function PoliciesPage() {
  const [active, setActive] = useState<PolicyKey>('terms');
  const policy = POLICIES[active];

  return (
    <div className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Minh bạch thông tin"
        title="Trung tâm chính sách"
        description="Các mục này là bố cục nội dung. Văn bản chính thức cần được soạn theo doanh nghiệp, game và phương thức thanh toán thực tế."
      />

      <Tabs value={active} onValueChange={(value) => setActive(value as PolicyKey)}>
        <TabsList id="policyNav" aria-label="Danh mục chính sách">
          {POLICY_KEYS.map((key) => (
            <TabsTrigger key={key} value={key} data-policy={key}>
              {POLICIES[key].label}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card id="policyContent" data-reveal="fade" className="gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-navy-soft">{policy.title}</h2>
          </div>

          <p className="leading-relaxed text-muted-foreground">{policy.body}</p>

          <Alert variant="info">
            <Info />
            <AlertDescription>
              Nội dung giữ chỗ, chưa phải điều khoản chính thức.
            </AlertDescription>
          </Alert>
        </Card>
      </Tabs>
    </div>
  );
}
