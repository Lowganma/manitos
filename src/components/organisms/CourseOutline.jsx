import LessonItem from '../molecules/LessonItem';

export default function CourseOutline({ sections = [], lessons = [], courseId }) {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.id}>
          <h4>{section.title}</h4>
          <ul>
            {lessons
              .filter((l) => l.section_id === section.id)
              .map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} courseId={courseId} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
