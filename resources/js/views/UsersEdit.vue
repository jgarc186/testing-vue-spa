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
                <button type="submit" :dissabled="saving">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
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
            }
        },
        created() {
            api.find(this.$route.params.id)
                .then((response) => {
                    setTimeout(() => {
                        this.loaded = true;
                        this.user = response.data.data;
                    }, 2000);
                });
        }
    };
</script>

<style scoped>

</style>
