<template>
    <div :class="(input && input.preview) ? 'has-preview' : null" class="image-input mt-1" @click="selectFile()">
        <img v-if="(input && input.preview)" :src="input.preview" alt="Image">
        <input :id="id" ref="input" accept=".png,.jpg,.jpeg" hidden type="file" @change="changeFile($event)">
        <div class="image-input-render">
            <button v-if="remove" class="btn-image-preview" type="button" @click="removeFile()">{{ $t('Remove') }}</button>
        </div>
        <div class="image-input-empty">
            <p class="image-input-empty-text">{{ $t('Select a file') }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "image-input",
    props: {
        value: {
            required: false
        },
        id: {
            type: String,
            required: true
        },
        remove: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        input: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        selectFile() {
            this.$refs.input.click();
        },
        removeFile() {
            const self = this;
            self.app_icon.file = null;
            self.app_icon.preview = null;
        },
        changeFile(event) {
            const self = this;
            if (event.target.files.length) {
                if (['image/png', 'mage/x-citrix-png', 'image/x-png', 'image/jpeg', 'image/x-citrix-jpeg'].includes(event.target.files[0].type)) {
                    self.input.file = event.target.files[0];
                    self.input.preview = URL.createObjectURL(event.target.files[0]);
                } else {
                    self.$notify({
                        title: self.$i18n.t('Unsupported file type').toString(),
                        text: self.$i18n.t('Only image type files are accepted').toString(),
                        type: 'error'
                    })
                }
            }
        },
    }
}
</script>
