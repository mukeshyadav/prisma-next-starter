import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { List, ListItem, Image, Stack, Heading } from '@chakra-ui/core';

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
  <List>
    {songs.map((song) => (
      <ListItem m={8} key={song.id} border="1px solid" borderColor="gray.200">
        <Link href="/songs/[id]" as={`songs/${song.id}`} passHref>
          {song.name}
        </Link>
      </ListItem>
    ))}
  </List>
);
