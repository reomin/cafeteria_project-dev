import {useSession} from 'next-auth/react';
import {Box, Flex, Heading, Button} from './Common';
import NextLink from 'next/link';

console.log('Have a good day 😄');
export default function Header() {
  const {data: sesseion} = useSession();
  return (
    <header className="">
      <Box as="header">
        <Flex
          bg="white"
          color="gray.600"
          minH={'60px'}
          py={{base: 2}}
          px={{base: 4}}
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          align="center"
          backgroundColor="#FBCF86"
        >
          <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
            <Heading as="h1" size="lg">
              <NextLink href="/">Cafeteria_Database</NextLink>
            </Heading>

            {/* ログインボタンとマイページボタンを作る */}
            {sesseion ? (
              <div className="flex gap-5">
                <div>
                  <img
                    src={sesseion.user.image!}
                    alt="profile-img"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <Button
                  as={NextLink}
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="orange.400"
                  href="/user/mypage"
                  _hover={{
                    bg: 'orange.300',
                  }}
                >
                  マイページ
                </Button>
              </div>
            ) : (
              <Button
                as={NextLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="orange.400"
                href="/user/login"
                _hover={{
                  bg: 'orange.300',
                }}
              >
                ログイン
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
