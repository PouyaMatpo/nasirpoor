<template>
    <client-only>
        <file-pond ref="pond" :max-file-size="size" :accepted-file-types="types" :allow-file-encode="true" credits=""
            :instant-upload="true" :server="serverOptions" :label-idle="labelIdle" @init="start"
            :allow-process="true" />
    </client-only>
</template>
<script>
import vueFilePond, { setOptions } from 'vue-filepond';
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import fa_ir from 'filepond/locale/fa_ir.js';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize
);

export default {
    name: 'FileCollectionUploader',

    components: { FilePond },

    props: {
        uploadUrl: {
            type: String,
            required: true // Assuming this is required now, to enable server interaction
        },
        types: {
            type: String,
            default: 'image/jpeg'
        },
        size: {
            type: Number,
            default: 1000000
        },
        instantUpload: {
            type: Boolean,
            default: true // Set to true for auto-upload
        },
        allowProcess: {
            type: Boolean,
            default: true // Set to true for upload progress
        },
        labelIdle: {
            type: String,
            default: "برای بارگذاری کلیک کنید یا فایل خود را در این قسمت رها کنید"
        }
    },

    data() {
        return {
            instance: null,
            myFiles: [],
            serverOptions: {
                url: this.uploadUrl,
                process: {
                    url: '/',
                    method: 'POST',
                    withCredentials: false,
                    headers: {},
                    timeout: 7000,
                    onload: (response) => response.key, // Handle server response here
                    onerror: (response) => response.data,
                    ondata: (formData) => {
                        // You can modify the form data here if needed
                        return formData;
                    },
                },
                revert: null, // Optional: add revert options if you want to handle file removal
                load: null,   // Optional: add load options for retrieving files
                restore: null,
                fetch: null,
            }
        }
    },

    methods: {
        start() {
            this.instance = this.$refs.pond._pond;

            // Handle preparefile event
            this.instance.on('preparefile', (e) => this.$emit('preparefile', e));

            // Handle processfile event
            this.instance.on('processfile', (e) => {
                // Do not remove the file after processing, allowing it to stay on the pond
                // Just emit the 'update' event so the parent component can act accordingly
                this.$emit('update');
            });
        }
    }
}
</script>