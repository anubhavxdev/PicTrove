export default function About() {
  return (
    <>
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 pt-16">
        <h1 className="text-4xl font-bold mb-4">About PixTrove</h1>
        <p className="max-w-2xl text-lg mb-8 text-gray-300 text-center">
          PixTrove is a modern event photo organizer that leverages face recognition to automatically sort and deliver event photos to the right attendees. Designed for simplicity, privacy, and speed, PixTrove helps you relive your event memories with ease.
        </p>
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg max-w-xl w-full">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc ml-6 text-gray-300">
            <li>Face recognition-based sorting of event photos</li>
            <li>Role-based dashboards for Attendees, Cameramen, and Admins</li>
            <li>Secure cloud photo storage with AWS S3</li>
            <li>Modern, dark-themed UI with responsive design</li>
            <li>Easy onboarding and photo access for all users</li>
          </ul>
        </div>
      </main>

    </>
  );
}
