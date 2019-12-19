<template>
    <div>
        <h1>Create a User</h1>
        <div v-if="message">{{ message }}</div>
        <form @submit.prevent="onSubmit($event)">
            <div>
                <label for="name">
                    Name
                </label>
                <input type="text" id="name" v-model="user.name" placeholder="Please put your name in here..." required>
            </div>
            <div>
                <label for="email">
                    Email
                </label>
                <input type="email" id="email" v-model="user.email" placeholder="Please put your email in here...">
            </div>
            <div>
                <label for="password">
                    Password
                </label>
                <input type="password" id="password" v-model="user.password" placeholder="Please put your password in here...">
            </div>
            <button type="submit" :disabled="saving">
                {{ saving ? 'Creating...' : 'Create' }}
            </button>
        </form>
    </div>
</template>

<script>
    import api from '../api/users';

    export default {
        data() {
            return {
                saving: false,
                message: false,
                user: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },

        methods: {
            onSubmit(event) {
                this.saving = true;
                this.message = false;

                api.create(this.user)
                    .then((response) => {
                        this.$router.push({
                            name: 'users.edit',
                            params: {
                                id: response.data.data.id
                            }
                        });
                    })
                    .catch((e) => {
                        this.message = e.response.data.message || 'There was an issue creating the User';
                    })
                    .then(() => {
                        this.saving = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
