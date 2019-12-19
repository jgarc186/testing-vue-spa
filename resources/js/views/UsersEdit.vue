<template>
    <div>
        <div v-if="message" class="alert">{{ message }}</div>
        <div v-if="! loaded">Loading...</div>
        <form @submit.prevent="onSubmit($event)" v-else>
            <div>
                <label for="user_name">Name</label>
                <input id="user_name" v-model="user.name" />
            </div>
            <div>
                <label for="user_email">Email</label>
                <input id="user_email" type="email" v-model="user.email" />
            </div>
            <div>
                <button type="submit" :disabled="saving">Update</button>
                <button type="submit" :disabled="saving" @click.prevent="onDelete($event)">Delete</button>
            </div>
        </form>
    </div>
</template>

<script>
    import api from "../api/users";

    export default {
        data() {
            return {
                message: null,
                saving: false,
                loaded: false,
                user: {
                    id: null,
                    name: "",
                    email: ""
                }
            };
        },
        methods: {
            onSubmit(event) {
                this.saving = true;

                api.update(this.user.id, {
                    name: this.user.name,
                    email: this.user.email,
                }).then((response) => {
                    this.message = 'User updated';
                    setTimeout(() => this.message = null, 10000);
                    this.user = response.data.data;
                }).catch(error => {
                    console.log(error)
                }).then(_ => this.saving = false);
            },

            onDelete() {
                this.saving = true;

                api.delete(this.user.id)
                    .then((response) => {
                        this.message = "User has been deleted from the database!";
                        setTimeout(() => this.$router.push({ name: 'users.index' }), 6000);
                    });
            }
        },
        created() {
            api.find(this.$route.params.id)
                .then((response) => {
                    setTimeout(() => {
                        this.loaded = true;
                        this.user = response.data.data;
                    }, 2000);
                })
                .catch((err) => {
                    this.$router.push({
                        name: '404'
                    });
                });
        }
    };
</script>

<style scoped>

</style>
