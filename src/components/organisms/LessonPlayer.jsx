export default function LessonPlayer({ lesson }) {
  if (!lesson) return null;
  if (lesson.content_type === 'video' && lesson.video_url) {
    return (
      <iframe
        src={lesson.video_url}
        title={lesson.title}
        width="100%"
        height="400"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <div>{lesson.text_content}</div>;
}
