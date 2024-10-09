import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { ArticlesList } from '@/features/articles';
import { CodesList } from '@/features/codes';

import { SkillProjectsLinkGroup } from '../badge/skill-projects-link-group';

import type { SkillWithRelations } from '../../types';

type SkillMetaProps = {
  skill: SkillWithRelations;
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
              <SkillProjectsLinkGroup projects={skill.projects} />
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
                  variant="outline"
                >
                  <Icon name="Plus" className="mr-2 size-4" />
                  記事を追加
                </Link>
              </div>
              <ArticlesList articles={skill.articles} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="codes">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="CodeXml" />
                <span>コード</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-4 text-right">
                <Link
                  href={`/skills/${skill.id}/codes/create`}
                  variant="outline"
                >
                  <Icon name="Plus" className="mr-2 size-4" />
                  コードを追加
                </Link>
              </div>
              <CodesList codes={skill.codes} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
