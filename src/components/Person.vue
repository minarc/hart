<template>
  <v-card>
    <v-toolbar color="deep-purple accent-2" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>랭킹</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

        <v-list-tile v-else :key="item.title" avatar>
          <v-list-tile-avatar size="50">
            <v-img :src="item.avatar"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <v-rating
                dense
                size="20"
                background-color="purple lighten-3"
                readonly
                color="purple accent-4"
              ></v-rating>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { header: '정치인' },
        {
          avatar:
            'https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg',
          title: '문재인',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://pbs.twimg.com/profile_images/3302121354/aba02dac9d648ffe61bad156371500e5_400x400.jpeg',
          title: '박근혜',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://s3.namuwikiusercontent.com/s/c9e857ec705a70c4bf1254f5de305f19dea06918b99104665653fc5faaf0784f82e5bd826c0988c2c5998d7c000905e1e35649635ac5d00cc176c30088a7c3694ee8c0f72698a453e78398eea3fe93bc4c76b035385295d1ac37cb5f2968b1b8',
          title: '홍준표',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Hwang_Kyo-ahn_December_2016.jpg/250px-Hwang_Kyo-ahn_December_2016.jpg',
          title: '황교안',
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://s-i.huffpost.com/gen/5632402/thumbs/o-THE-570.jpg?7',
          title: '유시민',
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    }
  }
}
</script>

<style>
</style>
