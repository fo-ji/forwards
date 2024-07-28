import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';

import type { Skill } from '@prisma/client';

type SkillMetaProps = {
  skill: Skill;
};

export const SkillMeta = ({ skill }: SkillMetaProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{skill.name}</CardTitle>
        <CardDescription>
          <Link
            target="_blank"
            href={skill.url}
            className="h-auto p-0 text-sm text-muted-foreground"
          >
            {skill.url}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Accordion type="multiple" defaultValue={['projects']}>
          <AccordionItem value="projects">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="FolderKanban" />
                <span>プロジェクト</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 text-right">
                <Button variant="secondary">
                  <Icon name="Plus" className="mr-2 size-4" />
                  プロジェクトを追加
                </Button>
              </div>
              <List />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="articles">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="StickyNote" />
                <span>記事</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 text-right">
                <Link
                  href={`/skills/${skill.id}/articles/create`}
                  variant="secondary"
                >
                  <Icon name="Plus" className="mr-2 size-4" />
                  記事を追加
                </Link>
              </div>
              <List />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="commands">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="CodeXml" />
                <span>コマンド</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 text-right">
                <Button variant="secondary">
                  <Icon name="Plus" className="mr-2 size-4" />
                  コマンドを追加
                </Button>
              </div>
              <List />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

// todo 仮置
const List = () => {
  return (
    <div>
      {[
        {
          title: 'Your call has been confirmed.',
          description: '1 hour ago',
        },
        {
          title: 'You have a new message!',
          description: '1 hour ago',
        },
        {
          title: 'Your subscription is expiring soon!',
          description: '2 hours ago',
        },
      ].map((notification, index) => (
        <div
          key={index}
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span className="flex size-2 translate-y-1 rounded-full bg-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {notification.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {notification.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
