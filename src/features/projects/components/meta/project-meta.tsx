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
import { Markdown } from '@/components/ui/markdown';

import { ProjectSkillsLinkGroup } from '../badge/project-skills-link-group';
import { ProjectStatusBadge } from '../badge/project-status-badge';

import type { ProjectWithRelations } from '../../types';

type ProjectMetaProps = {
  project: ProjectWithRelations;
};

export const ProjectMeta = ({ project }: ProjectMetaProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        {project.url && (
          <CardDescription>
            <Link
              target="_blank"
              href={project.url}
              className="h-auto p-0 text-sm text-muted-foreground"
            >
              {project.url}
            </Link>
          </CardDescription>
        )}
        <div className="mt-2">
          <ProjectStatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Accordion type="multiple" defaultValue={['skills']}>
          <AccordionItem value="skills">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="BookMarked" />
                <span>気になるスキル</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ProjectSkillsLinkGroup skills={project.skills} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="installation">
            <AccordionTrigger>
              <div className="flex gap-2">
                <Icon name="CodeXml" />
                <span>インストール手順</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {project.installation && (
                <Markdown value={project.installation} />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
