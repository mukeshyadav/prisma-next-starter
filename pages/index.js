import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });
  return {
    props: {
      songs
    }
  };
}

export default ({ songs }) => (
  <ul>
    {songs.map((song) => (
      <li key={song.id}>
        <Link href="/songs/[id]" as={`songs/${song.id}`}>
          {song.name}
        </Link>
      </li>
    ))}
  </ul>
);
