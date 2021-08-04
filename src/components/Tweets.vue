<template>
  <div class="container">
    <TweetCard
      v-for="tweet in tweetsData.tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
      :initial-replies="tweet.Replies"
      @after-delete-like="afterDeleteLike"
      @after-add-like="afterAddLike"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import TweetCard from "../components/TweetCard.vue";

export default {
  components: {
    TweetCard,
  },
  setup() {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

    const dummyData = {
      tweets: [
        {
          id: 34,
          description:
            "Atque consequatur sit iste est nihil quasi qui laborum dolorem. Est reiciendis ut. Aut excepturi quis ut non ducimus rem iste rem quisquam. Aperiam voluptatem voluptatibus ut nisi est assumenda aut. Ipsa delectus sed delectus libero voluptas quisquam.",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [
            {
              id: 25,
              comment:
                "Distinctio sit sit et fugit pariatur ut molestiae. Nam culpa ut minus id illo quibusdam. Voluptas minima rem sunt est aut aperiam. Et fugiat aut voluptas nulla temporibus perspiciatis illum deserunt odit.\n \rEt hic expedita ut ut est quod. Quos reiciendis dolor et occaecati. Velit ullam vel. Voluptates magni et debitis quia reprehenderit eligendi vero repudiandae voluptatem. Dicta perferendis nemo autem hic beatae consequatur doloribus. Quaerat et nemo esse qui.\n \rNatus qui totam necessitatibus eum eum. Saepe asperiores at impedit voluptate delectus illum numquam dolorem dignissimos. Ut tenetur esse officia.",
              UserId: 13,
              TweetId: 34,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 13,
                email: "user12@example.com",
                name: "user12",
                avatar:
                  "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200",
                introduction:
                  "Tempore excepturi voluptas. Et ut ipsam quisquam deleniti maiores. Fugit nihil eligendi animi aspernatur. Distinctio quae deleniti magnam dolores id tempora ut.\n \rLabore dignissimos aut sit natus. Dicta omnis dolor nesciunt rerum doloribus itaque fugit consectetur. Reiciendis temporibus mollitia ut et omnis quos aut suscipit pariatur. Sapiente incidunt quibusdam esse unde aliquam suscipit enim corporis debitis. Cumque quas rerum aut ut officiis iure explicabo. Eligendi facilis rerum amet molestiae omnis maiores.\n \rProvident enim quia non doloremque. Occaecati voluptas ratione maxime reprehenderit. Sint veniam qui doloribus laudantium quo nisi nam aperiam.",
                role: "user",
                createdAt: "2021-04-22T13:07:02.000Z",
                updatedAt: "2021-04-22T13:07:02.000Z",
              },
            },
            {
              id: 64,
              comment: "molestias",
              UserId: 21,
              TweetId: 34,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 21,
                email: "user20@example.com",
                name: "user20",
                avatar: "https://uifaces.co/our-content/donated/uTUM6Mu3.jpg",
                introduction:
                  "Ea quidem quasi ipsum qui est ex ipsam dignissimos. Omnis distinctio et eaque nemo quasi eaque consequatur. Ea voluptatibus ea sint tempora laudantium. Ad laboriosam ratione animi possimus non consequatur enim natus consectetur.\n \rEnim molestiae aut adipisci molestias quo nisi possimus numquam soluta. Dolorum voluptates labore consequatur sed in consequatur rerum cupiditate. Omnis dolor harum architecto rerum ipsam blanditiis velit unde. Illum voluptatem soluta. Accusamus facere et. Sit corporis fugit adipisci error veritatis.\n \rEnim qui quo aut fugiat est optio. Sit nam non assumenda recusandae veniam voluptas id repellendus. Dicta ea quidem sit fugit suscipit autem. Quos atque facere non et inventore dolores est sed consequatur. Veniam atque iusto consectetur est placeat corrupti sed. Autem dignissimos tenetur.",
                role: "user",
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 100,
              comment: "nam blanditiis officia",
              UserId: 9,
              TweetId: 34,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 9,
                email: "user8@example.com",
                name: "user8",
                avatar: "https://uifaces.co/our-content/donated/N5PLzyan.jpg",
                introduction: "Et dolore reprehenderit quo provident quis.",
                role: "user",
                createdAt: "2021-04-22T13:07:02.000Z",
                updatedAt: "2021-04-22T13:07:02.000Z",
              },
            },
            {
              id: 113,
              comment: "Eius aut autem et dicta.",
              UserId: 22,
              TweetId: 34,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 22,
                email: "user21@example.com",
                name: "user21",
                avatar:
                  "https://images.unsplash.com/photo-1547067678-b2708d4f444e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
                introduction:
                  "Non saepe commodi quia asperiores et et rem assumenda.\nVeniam nulla dolores dignissimos.",
                role: "user",
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
          ],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 4,
        },
        {
          id: 75,
          description: "aliquam magnam est",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [
            {
              id: 27,
              comment:
                "Excepturi accusantium illum vitae. Necessitatibus qui ab laboriosam quibusdam quia. Error eius repellendus quos nisi earum impedit sed ducimus.",
              UserId: 11,
              TweetId: 75,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 11,
                email: "user10@example.com",
                name: "user10",
                avatar: "https://i.imgur.com/p4RS9FZ.jpg",
                introduction:
                  "Eum ut vel eos.\nPariatur voluptatem alias illo modi eum harum.\nSed velit unde aut qui quis.\nEa nobis ut nam id nobis eos.\nMolestias sed qui voluptatum quia reiciendis non.",
                role: "user",
                createdAt: "2021-04-22T13:07:02.000Z",
                updatedAt: "2021-04-22T13:07:02.000Z",
              },
            },
            {
              id: 29,
              comment: "ea eum quo",
              UserId: 2,
              TweetId: 75,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 2,
                email: "user1@example.com",
                name: "user1",
                avatar:
                  "https://images.unsplash.com/photo-1544817747-b11e3e3b6ac2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
                introduction:
                  "Corrupti aut sint laudantium officia est culpa voluptas. Tenetur debitis soluta occaecati assumenda ex eveniet. Optio quas qui dolores vitae. Placeat tenetur accusantium harum voluptas iste quibusdam et. Corrupti reiciendis sit voluptatum quam. Nesciunt esse non modi et quibusdam officia vel rerum.",
                role: "user",
                createdAt: "2021-04-22T13:07:01.000Z",
                updatedAt: "2021-04-22T13:07:01.000Z",
              },
            },
          ],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 2,
        },
        {
          id: 8,
          description:
            "Placeat voluptate facilis. Incidunt magni optio qui. Et odio non error nemo.",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [
            {
              id: 68,
              comment:
                "Natus illo dolores. Quia pariatur earum qui delectus aliquam. Dicta iusto occaecati et reiciendis et illo.",
              UserId: 6,
              TweetId: 8,
              createdAt: "2021-04-22T13:07:03.000Z",
              updatedAt: "2021-04-22T13:07:03.000Z",
              User: {
                id: 6,
                email: "user5@example.com",
                name: "user5",
                avatar: "https://i.imgur.com/Aa2cYGQ.jpg",
                introduction:
                  "Dolorum odit repellendus et cumque rerum quis architecto. Dignissimos autem ut.",
                role: "user",
                createdAt: "2021-04-22T13:07:02.000Z",
                updatedAt: "2021-04-22T13:07:02.000Z",
              },
            },
          ],
          LikedUsers: [
            {
              id: 3,
              email: "user2@example.com",
              name: "user2",
              avatar: "https://randomuser.me/api/portraits/women/66.jpg",
              introduction: "Nihil nisi commodi.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 64,
                UserId: 3,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 9,
              email: "user8@example.com",
              name: "user8",
              avatar: "https://uifaces.co/our-content/donated/N5PLzyan.jpg",
              introduction: "Et dolore reprehenderit quo provident quis.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 65,
                UserId: 9,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 10,
              email: "user9@example.com",
              name: "user9",
              avatar: "https://uifaces.co/our-content/donated/rXdjGcpJ.jpeg",
              introduction:
                "Aliquid aut non cumque harum quis vero. Repellat quo non natus mollitia ipsam dolore quos iusto. Nemo officiis soluta consequuntur cum. Quo iure eveniet molestiae maxime. Eligendi eius excepturi eos sed alias animi. A provident fuga.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 66,
                UserId: 10,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 11,
              email: "user10@example.com",
              name: "user10",
              avatar: "https://i.imgur.com/p4RS9FZ.jpg",
              introduction:
                "Eum ut vel eos.\nPariatur voluptatem alias illo modi eum harum.\nSed velit unde aut qui quis.\nEa nobis ut nam id nobis eos.\nMolestias sed qui voluptatum quia reiciendis non.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 67,
                UserId: 11,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 12,
              email: "user11@example.com",
              name: "user11",
              avatar:
                "https://images.pexels.com/photos/372059/pexels-photo-372059.jpeg?crop=faces&fit=crop&h=200&w=200&amp;auto=compress&amp;cs=tinysrgb",
              introduction:
                "Doloribus voluptatem eius natus nihil. Animi pariatur suscipit incidunt nulla alias. Molestiae rerum laborum in enim quisquam exercitationem.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 68,
                UserId: 12,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 13,
              email: "user12@example.com",
              name: "user12",
              avatar:
                "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200",
              introduction:
                "Tempore excepturi voluptas. Et ut ipsam quisquam deleniti maiores. Fugit nihil eligendi animi aspernatur. Distinctio quae deleniti magnam dolores id tempora ut.\n \rLabore dignissimos aut sit natus. Dicta omnis dolor nesciunt rerum doloribus itaque fugit consectetur. Reiciendis temporibus mollitia ut et omnis quos aut suscipit pariatur. Sapiente incidunt quibusdam esse unde aliquam suscipit enim corporis debitis. Cumque quas rerum aut ut officiis iure explicabo. Eligendi facilis rerum amet molestiae omnis maiores.\n \rProvident enim quia non doloremque. Occaecati voluptas ratione maxime reprehenderit. Sint veniam qui doloribus laudantium quo nisi nam aperiam.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 69,
                UserId: 13,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 14,
              email: "user13@example.com",
              name: "user13",
              avatar: "https://uifaces.co/our-content/donated/eqUZLcBO.jpg",
              introduction: "quia minus alias",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 70,
                UserId: 14,
                TweetId: 8,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
          ],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 7,
          replyCount: 1,
        },
        {
          id: 10,
          description:
            "Eos quia excepturi expedita quam tenetur rerum. Nulla aliquam doloremque voluptatibus dolorem quis dolores ea et. Exercitationem exercitationem distinctio numquam in voluptatum aut. Ipsam dignissimos error eaque. Fugit ipsum dolorem nesciunt doloribus aliquam autem.",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [],
          LikedUsers: [
            {
              id: 10,
              email: "user9@example.com",
              name: "user9",
              avatar: "https://uifaces.co/our-content/donated/rXdjGcpJ.jpeg",
              introduction:
                "Aliquid aut non cumque harum quis vero. Repellat quo non natus mollitia ipsam dolore quos iusto. Nemo officiis soluta consequuntur cum. Quo iure eveniet molestiae maxime. Eligendi eius excepturi eos sed alias animi. A provident fuga.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 77,
                UserId: 10,
                TweetId: 10,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 11,
              email: "user10@example.com",
              name: "user10",
              avatar: "https://i.imgur.com/p4RS9FZ.jpg",
              introduction:
                "Eum ut vel eos.\nPariatur voluptatem alias illo modi eum harum.\nSed velit unde aut qui quis.\nEa nobis ut nam id nobis eos.\nMolestias sed qui voluptatum quia reiciendis non.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 78,
                UserId: 11,
                TweetId: 10,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 12,
              email: "user11@example.com",
              name: "user11",
              avatar:
                "https://images.pexels.com/photos/372059/pexels-photo-372059.jpeg?crop=faces&fit=crop&h=200&w=200&amp;auto=compress&amp;cs=tinysrgb",
              introduction:
                "Doloribus voluptatem eius natus nihil. Animi pariatur suscipit incidunt nulla alias. Molestiae rerum laborum in enim quisquam exercitationem.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 79,
                UserId: 12,
                TweetId: 10,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 13,
              email: "user12@example.com",
              name: "user12",
              avatar:
                "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200",
              introduction:
                "Tempore excepturi voluptas. Et ut ipsam quisquam deleniti maiores. Fugit nihil eligendi animi aspernatur. Distinctio quae deleniti magnam dolores id tempora ut.\n \rLabore dignissimos aut sit natus. Dicta omnis dolor nesciunt rerum doloribus itaque fugit consectetur. Reiciendis temporibus mollitia ut et omnis quos aut suscipit pariatur. Sapiente incidunt quibusdam esse unde aliquam suscipit enim corporis debitis. Cumque quas rerum aut ut officiis iure explicabo. Eligendi facilis rerum amet molestiae omnis maiores.\n \rProvident enim quia non doloremque. Occaecati voluptas ratione maxime reprehenderit. Sint veniam qui doloribus laudantium quo nisi nam aperiam.",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 80,
                UserId: 13,
                TweetId: 10,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
            {
              id: 14,
              email: "user13@example.com",
              name: "user13",
              avatar: "https://uifaces.co/our-content/donated/eqUZLcBO.jpg",
              introduction: "quia minus alias",
              role: "user",
              createdAt: "2021-04-22T13:07:02.000Z",
              updatedAt: "2021-04-22T13:07:02.000Z",
              Like: {
                id: 81,
                UserId: 14,
                TweetId: 10,
                createdAt: "2021-04-22T13:07:03.000Z",
                updatedAt: "2021-04-22T13:07:03.000Z",
              },
            },
          ],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 5,
          replyCount: 0,
        },
        {
          id: 124,
          description:
            "Placeat est fugit omnis eos. Architecto repellat deleniti cum molestiae eum. Voluptatem enim sapiente quis voluptas dignissimos quia aut magnam. Eum odio est officia. Dolore enim asperiores nihil nobis iure voluptas et rerum.",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 0,
        },
        {
          id: 147,
          description: "non explicabo aspernatur",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 0,
        },
        {
          id: 148,
          description: "eos vitae eos",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 0,
        },
        {
          id: 181,
          description:
            "Commodi qui iusto laborum qui qui reprehenderit velit ipsam. Qui sit explicabo sed quisquam dolorum possimus. Repudiandae accusantium voluptas sed dolor inventore voluptatem vel. At voluptas possimus.",
          UserId: 3,
          createdAt: "2021-04-22T13:07:03.000Z",
          updatedAt: "2021-04-22T13:07:03.000Z",
          Replies: [],
          LikedUsers: [],
          User: {
            id: 3,
            email: "user2@example.com",
            password:
              "$2a$10$z6C2Z8qPBhPV36ykFKfa1ePfzC4mImtaZImz/5lsaXyZ60dkK6.pK",
            name: "user2",
            avatar: "https://randomuser.me/api/portraits/women/66.jpg",
            introduction:
              "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
            role: "user",
            createdAt: "2021-04-22T13:07:01.000Z",
            updatedAt: "2021-04-22T13:07:01.000Z",
          },
          likedCount: 0,
          replyCount: 0,
        },
      ],
    };

    let tweetsData = reactive({
      tweets: [],
    });

    onMounted(async () => {
      tweetsData.tweets = dummyData.tweets.map((tweet) => {
        tweet.isThumbsUp = tweet.LikedUsers.map((user) => user.id).includes(
          currentUser.id
        );
        return tweet;
      });
    });

    return {
      currentUser,
      tweetsData,
    };
  },

  methods: {
    afterCreateTweet(tweetText) {
      console.log("afterCreateTweet");
      console.log("tweetText: ", tweetText);
    },

    afterDeleteLike(tweetId) {
      this.tweetsData.tweets = this.tweetsData.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          tweet.LikedUsers = tweet.LikedUsers.filter(
            (user) => user.id !== this.currentUser.id
          );
          tweet.isThumbsUp = false;
          tweet.likedCount = tweet.likedCount - 1;
          return tweet;
        }
      });
    },

    afterAddLike(tweetId) {
      this.tweetsData.tweets = this.tweetsData.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          tweet.LikedUsers.push(this.currentUser);
          tweet.isThumbsUp = true;
          tweet.likedCount = tweet.likedCount + 1;
          return tweet;
        }
      });
    },

    afterCreateComment(payload) {
      console.log("tweetId: ", payload.tweetId);
      console.log("comment: ", payload.comment);
      console.log("afterCreateComment");
      console.log("");
    },
  },
};
</script>