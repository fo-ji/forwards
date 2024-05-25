import type { Skill } from '@prisma/client';

type SkillsListProps = {
  skills: Skill[];
};

export const SkillsList = ({ skills }: SkillsListProps) => {
  if (!skills.length) return <div>No Skills</div>;
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill.id}>{skill.name}</li>
      ))}
    </ul>
  );
};
