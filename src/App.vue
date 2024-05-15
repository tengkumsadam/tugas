<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li @click="activeTab = 'todos'" :class="{ 'active': activeTab === 'todos' }">Todos</li>
          <li @click="activeTab = 'post'" :class="{ 'active': activeTab === 'post' }">Post</li>
        </ul>
      </nav>
    </header>
    <div v-if="activeTab === 'todos'">
      <h2>Daftar Kegiatan</h2>
      <!-- Isi untuk fitur Todos -->
      <ul class="kegiatan-list">
        <li v-for="kegiatan in kegiatanList" :key="kegiatan.id">
          <div class="kegiatan-item">
            <input type="checkbox" v-model="kegiatan.isDone" />
            <span :class="{ 'text-decoration-line-through': kegiatan.isDone }">{{ kegiatan.nama }}</span>
            <button @click="deleteKegiatan(kegiatan)" class="button-delete">Hapus</button>
          </div>
        </li>
      </ul>
      <form @submit.prevent="addKegiatan">
        <input type="text" v-model="newKegiatan.nama" placeholder="Tambah Kegiatan Baru" class="input-new-kegiatan" />
        <button type="submit" class="button-add-kegiatan">Tambah</button>
      </form>
    </div>
    <div v-else-if="activeTab === 'post'">
      <h2>Postingan dari User</h2>
      <!-- Isi untuk fitur Postingan -->
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="selectedUser">
        <div v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kegiatanList: [
        { id: 1, nama: 'Belajar Vue.js', isDone: false },
        { id: 2, nama: 'Meeting dengan Tim', isDone: false }
      ],
      newKegiatan: { nama: '' },
      activeTab: 'todos', // Menyimpan tab yang aktif (todos/post)
      users: [], // Menyimpan daftar user
      selectedUser: null, // Menyimpan user yang dipilih
      posts: [] // Menyimpan postingan
    };
  },
  methods: {
    addKegiatan() {
      this.kegiatanList.push({ id: this.kegiatanList.length + 1, nama: this.newKegiatan.nama, isDone: false });
      this.newKegiatan.nama = '';
    },
    deleteKegiatan(kegiatan) {
      this.kegiatanList = this.kegiatanList.filter(k => k.id !== kegiatan.id);
    },
    async fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        this.posts = await response.json();
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.userId === this.selectedUser);
    }
  },
  mounted() {
    this.fetchPosts();
    this.fetchUsers();
  }
};
</script>

<style>
/* CSS untuk styling header */
header {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}

/* CSS tambahan untuk fitur Postingan */
select {
  margin-bottom: 10px;
  padding: 5px;
}

select, option {
  font-size: 16px;
}

h3 {
  margin-bottom: 5px;
}

p {
  margin-top: 0;
}

</style>
