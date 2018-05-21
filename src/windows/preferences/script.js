const electron = require('electron')
const currentWindow = electron.remote.getCurrentWindow()
const Vue = require('vue/dist/vue')
const _ = require('lodash')

const { EmojiPickerPlugin } = require('vue-emoji-picker')
Vue.use(EmojiPickerPlugin)

Vue.component('icon-remove', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"/></svg>',
})

Vue.component('icon-plus', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z"/></svg>',
})

Vue.component('icon-checkbox', {
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
    },
    template: `
        <svg v-if="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v14h14V5H5zm8.41 7l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v14h14V5H5z"/></svg>
    `,
})

Vue.component('icon-face', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
})

Vue.component('icon-arrow-down', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"/></svg>',
})

Vue.component('icon-logo', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.317 164.275"><g fill="#FFF"><path d="M74.902 16.992c-3.124 1.688-6.22 4.279-9.282 7.773-3.062 3.496-5.946 7.592-8.649 12.291-2.703 4.702-5.194 9.794-7.476 15.275a167.505 167.505 0 0 0-5.946 16.721c-1.683 5.666-2.975 11.208-3.875 16.631-.901 5.425-1.351 10.366-1.351 14.822 0 1.931.059 3.737.181 5.423.118 1.691.362 3.254.723 4.7 2.771-.841 5.36-1.413 7.772-1.717 2.41-.3 4.458-.45 6.147-.45 3.494 0 6.566.571 9.219 1.716 2.649 1.146 5 2.622 7.05 4.43 3.615-3.735 7.018-8.407 10.213-14.011 3.191-5.604 5.934-11.778 8.225-18.529 2.288-6.747 4.095-13.827 5.423-21.239a126.697 126.697 0 0 0 1.989-22.325c0-5.663-.453-10.513-1.356-14.552-.903-4.036-2.381-7.35-4.429-9.942-2.049-2.59-4.821-4.486-8.315-5.694-3.497-1.204-7.773-1.807-12.834-1.807a63.018 63.018 0 0 0-20.065 3.254c-6.508 2.168-12.233 5.333-17.173 9.489-4.943 4.158-8.92 9.309-11.931 15.456-3.014 6.146-4.519 13.259-4.519 21.331 0 1.929.119 3.617.355 5.062.237 1.446.712 2.592 1.427 3.436-5.056 0-9.057-1.146-12.005-3.436C1.472 58.812 0 54.952 0 49.531c0-6.388 2.014-12.562 6.044-18.528 4.031-5.966 9.387-11.236 16.063-15.817 6.678-4.58 14.291-8.255 22.834-11.025C53.483 1.386 62.208 0 71.11 0c8.183 0 15.103 1.176 20.758 3.524 5.655 2.35 10.196 5.604 13.625 9.761 3.43 4.158 5.897 9.011 7.401 14.553 1.503 5.545 2.257 11.451 2.257 17.715 0 6.507-.749 13.558-2.24 21.149a125.229 125.229 0 0 1-6.655 22.416 104.25 104.25 0 0 1-11.194 20.788c-4.52 6.508-9.792 11.992-15.817 16.45a80.586 80.586 0 0 0 4.52 5.514 30.802 30.802 0 0 0 5.151 4.608c1.867 1.326 3.977 2.38 6.327 3.165 2.351.782 5.032 1.174 8.045 1.174.963 0 1.746-.03 2.35-.091a32.588 32.588 0 0 0 1.989-.271c-1.927 4.218-4.155 7.199-6.681 8.948-2.527 1.745-5.715 2.621-9.568 2.621-3.493 0-6.441-.57-8.847-1.717-2.407-1.146-4.455-2.622-6.138-4.429-1.687-1.807-3.132-3.858-4.335-6.147a125.299 125.299 0 0 1-3.43-7.049 49.952 49.952 0 0 1-9.568 2.982c-3.253.66-6.681.995-10.291.995-4.694 0-8.999-.664-12.911-1.988-3.912-1.327-7.312-3.437-10.199-6.328-2.89-2.891-5.115-6.626-6.68-11.209-1.565-4.577-2.347-10.181-2.347-16.81 0-4.818.449-10.272 1.352-16.359.9-6.085 2.253-12.293 4.059-18.619a132.182 132.182 0 0 1 6.765-18.438C31.514 40.943 34.7 35.641 38.37 31c3.666-4.639 7.756-8.375 12.266-11.208 4.511-2.831 9.533-4.248 15.067-4.248 1.322 0 2.762.09 4.327.271 1.564.183 3.189.575 4.872 1.177zm-24.466 96.893c-1.328 0-2.774.152-4.339.45-1.567.305-3.194.812-4.88 1.537 2.41 4.701 6.206 7.051 11.388 7.051 3.254 0 6.445-.903 9.582-2.71-1.327-1.927-2.924-3.464-4.79-4.611-1.872-1.144-4.191-1.717-6.961-1.717zM192.341 45.193l-13.197 61.46c-.604 2.412-.903 5.124-.903 8.135 0 2.051.362 3.918 1.084 5.604.724 1.688 2.229 2.53 4.52 2.53 2.892 0 5.812-1.745 8.767-5.242 2.953-3.492 5.754-8.318 8.407-14.463h6.688c-2.893 7.594-5.784 13.591-8.676 17.988-2.893 4.398-5.695 7.745-8.408 10.031-2.711 2.291-5.304 3.77-7.772 4.43-2.472.66-4.672.995-6.599.995-3.857 0-7.111-1.356-9.76-4.068-2.653-2.712-4.221-7.139-4.702-13.287-3.496 6.148-7.382 10.575-11.66 13.287-4.278 2.712-8.468 4.068-12.563 4.068-2.772 0-5.363-.576-7.773-1.718-2.412-1.144-4.519-2.739-6.327-4.791-1.808-2.048-3.226-4.577-4.248-7.595-1.026-3.008-1.537-6.385-1.537-10.121 0-2.893.362-5.967 1.085-9.221l12.292-58.024h18.257l-13.196 61.46a24.478 24.478 0 0 0-.723 5.967c0 3.496.783 6.086 2.35 7.772 1.565 1.688 3.494 2.53 5.785 2.53 3.494 0 7.078-1.717 10.757-5.151 3.674-3.437 6.174-8.285 7.5-14.554l12.293-58.024 18.259.002z"/><path d="M229.216 45.193l-13.195 61.46c-.605 2.412-.904 5.124-.904 8.135 0 2.051.362 3.918 1.085 5.604.723 1.688 2.228 2.53 4.52 2.53 2.892 0 5.813-1.745 8.767-5.242 2.952-3.492 5.755-8.318 8.406-14.463h6.689c-2.893 7.594-5.786 13.591-8.677 17.988-2.893 4.398-5.695 7.745-8.406 10.031-2.711 2.291-5.304 3.77-7.772 4.43-2.471.66-4.673.995-6.598.995-3.136 0-5.726-.542-7.774-1.628-2.05-1.084-3.677-2.53-4.88-4.339-1.206-1.809-2.08-3.917-2.621-6.326-.543-2.41-.815-4.999-.815-7.774 0-2.167.151-4.396.453-6.688a76.278 76.278 0 0 1 1.175-6.689l12.292-58.024h18.255zm-16.811-26.032c0-3.253 1.144-6.083 3.434-8.496 2.289-2.409 5.121-3.615 8.496-3.615 3.254 0 6.084 1.207 8.496 3.615 2.411 2.413 3.615 5.243 3.615 8.496 0 3.376-1.205 6.209-3.615 8.498-2.412 2.29-5.242 3.434-8.496 3.434-3.375 0-6.208-1.144-8.496-3.434-2.29-2.289-3.434-5.122-3.434-8.498z"/><path d="M286.52 72.849c1.565-.962 2.861-2.648 3.887-5.06 1.021-2.41 1.535-4.641 1.535-6.689s-.66-3.766-1.979-5.152c-1.319-1.385-3.358-2.077-6.115-2.077-4.198 0-8.001 1.716-11.419 5.15-3.418 3.436-6.328 7.714-8.725 12.834-2.399 5.125-4.257 10.667-5.576 16.631-1.319 5.965-1.978 11.479-1.978 16.541 0 6.267 1.176 10.817 3.526 13.646 2.349 2.834 6.477 4.249 12.382 4.249 6.386 0 12.292-1.596 17.715-4.791 5.423-3.191 10.123-8.163 14.1-14.914h6.146c-2.412 4.462-5.305 8.709-8.676 12.746-3.376 4.039-7.081 7.591-11.118 10.665-4.041 3.072-8.347 5.514-12.925 7.321-4.581 1.807-9.281 2.712-14.099 2.712-3.498 0-6.852-.542-10.071-1.628a23.698 23.698 0 0 1-8.563-5.062c-2.494-2.289-4.502-5.271-6.023-8.948-1.519-3.674-2.279-8.163-2.279-13.467 0-3.374.361-7.291 1.085-11.751.723-4.457 1.836-9.007 3.345-13.646 1.505-4.64 3.463-9.249 5.874-13.829 2.41-4.579 5.361-8.646 8.858-12.202 3.494-3.554 7.529-6.417 12.112-8.588 4.578-2.168 9.761-3.254 15.546-3.254 6.146 0 10.846 1.387 14.1 4.157 3.253 2.774 4.881 7.112 4.881 13.016 0 4.22-.814 7.803-2.441 10.756-1.626 2.954-4.008 4.429-7.141 4.429-2.652.002-4.64-1.264-5.964-3.795z"/><path d="M341.833 9.038l-14.099 65.438 37.238-29.284h17.535l-35.792 24.765a22.44 22.44 0 0 1 1.716-.271c.543-.059 1.113-.09 1.718-.09 3.493 0 6.386.574 8.678 1.718 2.288 1.146 4.095 2.65 5.422 4.518 1.324 1.871 2.26 3.977 2.801 6.329.543 2.347.815 4.729.815 7.139 0 2.53-.212 4.91-.633 7.14a131.211 131.211 0 0 1-1.356 6.327 256.544 256.544 0 0 0-1.355 5.875 26.886 26.886 0 0 0-.634 5.786c0 3.253.661 5.484 1.989 6.687 1.325 1.206 3.132 1.81 5.423 1.81.723 0 1.655-.059 2.802-.18 1.144-.12 2.378-.48 3.706-1.087-.243 4.582-1.748 8.226-4.519 10.938-2.773 2.712-6.57 4.068-11.388 4.068-3.135 0-5.785-.542-7.955-1.628-2.169-1.084-3.917-2.53-5.242-4.339-1.327-1.809-2.322-3.917-2.983-6.326-.664-2.41-.994-4.939-.994-7.593 0-2.408.21-4.67.633-6.777.42-2.109.873-4.128 1.356-6.059.48-1.925.932-3.822 1.354-5.692a25.76 25.76 0 0 0 .634-5.694c0-3.254-.665-5.604-1.988-7.051-1.328-1.446-3.195-2.168-5.604-2.168-6.87 0-12.957 4.641-18.258 13.919l-8.133 38.323h-18.078L323.215 11.57l18.618-2.532z"/></g><path fill="#FFF" d="M381.45 154.276l-1.09 10h405.775l1.092-10z"/><path fill="none" d="M703.022 68.752c-2.33-1.991-4.936-2.987-7.82-2.987-8.207 0-16.574 6.859-25.111 20.574-8.098 12.941-12.143 23.892-12.143 32.85 0 8.075 3.66 12.112 10.979 12.112 6.428 0 12.746-4.479 18.957-13.44 4.438-6.304 8.264-13.66 11.48-22.064l3.826-9.789c2.219-5.641 3.326-9.125 3.326-10.454.002-2.544-1.168-4.812-3.494-6.802z"/><path fill="#FFF" d="M745.606 15.866c-.229 0-.67-.053-1.334.093-1.223.296-3.938.316-8.152.316h-14.132c-1.223 0-1.834.41-1.834.973s1.055.956 3.16 1.05c3.551.223 5.633.453 6.238.619.607.167.918.657.918 1.437 0 .448-.229 1.508-.668 2.063l-9.633 23.858h14.471l9.635-23.88c.77-1.659 1.383-3.21 1.83-4.096.219-.442.383-.97.496-1.301.001-.661-.333-1.132-.995-1.132z"/><g fill="#FFF"><path d="M557.653 65.932c-9.207 0-17.189 6.6-23.953 19.792-6.432 12.643-9.646 24.509-9.646 35.596 0 8.317 3.711 12.475 11.145 12.475 9.314 0 17.076-5.986 23.285-17.962 6.982-13.528 10.48-25.947 10.48-37.259-.001-8.428-3.772-12.642-11.311-12.642z"/><path d="M734.639 46.276l-28.297 67.97c-2.883 6.977-4.322 10.745-4.322 12.404 0 3.102 1.768 4.65 5.32 4.65 5.32 0 9.861-2.897 13.631-8.692.266-.4.506-.751.73-1.064a17.688 17.688 0 0 1-.555-4.382c0-3.103.918-5.655 2.748-7.65 1.826-1.995 4.127-2.995 6.898-2.995 2.107 0 3.91.725 5.404 2.164 1.5 1.441 2.246 3.159 2.246 5.154 0 3.327-1.607 4.99-4.82 4.99-3.439 0-5.156-1.164-5.156-3.493 0-.771.139-1.552.412-2.328.279-.776.42-1.218.42-1.33 0-1.108-.447-1.663-1.332-1.663-.996 0-1.912.747-2.744 2.246-.836 1.495-1.246 3.134-1.246 4.905 0 1.025.109 2.02.312 2.982.195.223.293.557.293 1.008 0 .02-.008.04-.008.06.795 2.67 2.393 5.095 4.83 7.26 3.625 3.219 7.887 4.824 12.789 4.824 4.568 0 8.385-1.385 11.449-4.156 3.061-2.771 4.598-6.266 4.598-10.479 0-2.992-1.191-7.872-3.582-14.64-2.271-6.429-3.406-11.75-3.406-15.967 0-7.205 2.191-13.277 6.568-18.212 4.381-4.932 9.73-7.402 16.055-7.402 4.213 0 7.875 1.276 10.979 3.826 3.105 2.551 4.656 5.546 4.656 8.982 0 1.886-.611 3.492-1.83 4.822-1.221 1.33-2.662 1.995-4.322 1.995-3.328 0-4.99-1.604-4.99-4.822 0-2.661 1.104-3.992 3.322-3.992.338 0 .863.167 1.584.499.723.334 1.303.501 1.744.501.666 0 1-.38 1-1.146 0-1.85-1.277-3.648-3.824-5.39-2.557-1.742-5.158-2.614-7.82-2.614-3.547 0-6.545 1.136-8.982 3.402-2.438 2.269-3.656 5.008-3.656 8.215 0 2.765 2.605 10.457 7.814 23.065 1.223 2.987 1.834 6.36 1.834 10.122 0 7.524-2.557 13.829-7.652 18.92-5.105 5.086-11.479 7.633-19.129 7.633-6.65 0-12.225-1.86-16.717-5.573-2.189-1.81-3.836-3.828-4.959-6.048-.951 1.268-2.297 2.696-4.059 4.303-4.66 4.214-10.377 6.319-16.92 6.319-8.312 0-12.717-3.548-12.717-10.646v-4.821c-4 5.814-7.744 9.963-11.484 12.432-3.742 2.468-7.9 3.707-12.969 3.707-6.164 0-11.201-1.96-15.109-5.888s-5.863-9.034-5.863-15.344c0-13.055 6.213-25.375 18.633-36.991 11.197-10.511 21.898-15.731 32.102-15.731 7.094 0 11.809 3.454 14.137 10.216l1-1.872 1.164-2.234 9.33-22.008H394.542l-12.436 104h405.775l12.438-104h-65.68v-.003zm-242.607 69.676c-9.258 13.671-19.045 20.505-29.354 20.505-3.555 0-6.654-1.141-9.32-3.41-2.656-2.271-4.377-5.349-5.152-9.23-.334-1.554-.498-4.214-.498-7.984-6.547 13.751-14.805 20.626-24.783 20.626-4.436 0-8.098-1.33-10.979-3.992-2.886-2.663-4.326-6.044-4.326-10.148 0-5.43 1.551-11.694 4.66-18.796l9.979-22.951c1.664-3.88 2.496-7.042 2.496-9.48 0-2.995-1.277-4.49-3.824-4.49-2.225 0-5.049 1.454-8.484 4.36-3.439 2.908-6.046 6.062-7.816 9.462-.557 1.209-1.166 1.812-1.83 1.812-.666 0-1-.442-1-1.333 0-1.994 2.162-5.209 6.488-9.645 5.765-5.876 11.699-8.816 17.797-8.816 8.094 0 12.143 3.21 12.143 9.624 0 4.428-1.775 10.566-5.322 18.42l-9.814 21.571c-2.551 5.644-3.825 10.344-3.825 14.104 0 4.646 1.886 6.971 5.655 6.971 9.203 0 18.631-11.615 28.275-34.846l8.486-20.409 3.158-9.458c.332-1.324 1.104-2.044 2.328-2.156l1.998-.167 3.99-.497 4.66-.828c1.062-.193 1.58-.304 1.543-.328-.02 0-.031-.005-.049-.005.027 0 .045.002.049.005.85.015 1.283.343 1.283.992 0 .445-.225.891-.666 1.331-.562 1.11-1.164 2.494-1.83 4.158l-15.637 39.088c-2.441 6.099-3.66 11.089-3.66 14.969 0 5.435 2.389 8.15 7.152 8.15 7.984 0 16.689-7.817 26.111-23.451 6.988-11.644 10.48-22.896 10.48-33.767 0-2.438-.709-3.658-2.125-3.658-.219 0-.764.125-1.639.374-.215.083-.65.125-1.309.125-3.162 0-4.738-1.385-4.738-4.158 0-1.664.65-3.104 1.969-4.326 1.316-1.218 2.902-1.829 4.76-1.829 4.273 0 6.408 3.28 6.408 9.837.002 15.446-4.63 30.003-13.888 43.674zm71.937 8.527c-9.312 8.208-19.016 12.31-29.104 12.31-6.879 0-12.531-2.383-16.969-7.15s-6.65-10.922-6.65-18.462c0-6.43 1.83-13.031 5.488-19.796 3.658-6.761 8.539-12.527 14.637-17.297 9.537-7.428 18.74-11.146 27.609-11.146 6.766 0 12.252 2.441 16.469 7.318 4.215 4.881 6.322 11.256 6.322 19.129.001 12.972-5.937 24.675-17.802 35.094zm78.842-47.902l.332-1.664c.219-.664.334-1.273.334-1.83 0-2.661-1.33-3.991-3.994-3.991-3.215 0-7.705 3.105-13.473 9.314-5.766 6.211-11.197 14.913-16.301 26.112l-11.975 26.284c-1.107 2.549-2.055 3.822-2.824 3.822-2.223-.332-3.939-.675-5.158-.675-1.887 0-3.387.324-4.492.324h-.994c-1 0-1.502-.047-1.502-.492 0-.109.168-.247.502-.577l.828-1.626 28.111-63.998c0-.89-.721-1.307-2.164-1.307h-4.49c-1.66 0-2.492-.311-2.492-1.087 0-.666 2.883-1.067 8.646-1.292 5.766-.222 9.648-.701 11.645-1.479.885-.22 1.389-.322 1.498-.322.666 0 1 .337 1 1.002 0 .556-.727 2.61-2.164 6.156l-6.154 14.972c10.199-14.191 19.182-21.29 26.945-21.29 5.434 0 8.148 2.441 8.148 7.318 0 2.221-.721 4.133-2.164 5.739-1.441 1.608-3.104 2.413-4.982 2.413-1.781.004-2.666-.605-2.666-1.826z"/><path d="M703.022 68.752c-2.33-1.991-4.936-2.987-7.82-2.987-8.207 0-16.574 6.859-25.111 20.574-8.098 12.941-12.143 23.892-12.143 32.85 0 8.075 3.66 12.112 10.979 12.112 6.428 0 12.746-4.479 18.957-13.44 4.438-6.304 8.264-13.66 11.48-22.064l3.826-9.789c2.219-5.641 3.326-9.125 3.326-10.454.002-2.544-1.168-4.812-3.494-6.802z"/></g></svg>',
})

Vue.component('icon-logo-mono', {
    template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.317 164.276"><g fill="#333"><path d="M74.902 16.992c-3.124 1.689-6.22 4.28-9.282 7.774-3.062 3.496-5.946 7.592-8.649 12.291-2.703 4.702-5.194 9.794-7.476 15.275a167.595 167.595 0 0 0-5.946 16.721c-1.683 5.666-2.975 11.208-3.875 16.631-.901 5.425-1.351 10.366-1.351 14.822 0 1.931.059 3.737.181 5.423.118 1.691.362 3.254.723 4.7 2.771-.841 5.36-1.413 7.772-1.717 2.41-.299 4.458-.45 6.147-.45 3.494 0 6.566.571 9.219 1.716 2.649 1.146 5 2.622 7.05 4.43 3.615-3.736 7.018-8.408 10.213-14.011 3.191-5.604 5.934-11.778 8.225-18.529 2.288-6.747 4.095-13.828 5.423-21.24a126.689 126.689 0 0 0 1.989-22.325c0-5.663-.453-10.513-1.356-14.552-.903-4.036-2.381-7.349-4.429-9.942-2.049-2.59-4.821-4.486-8.315-5.694-3.497-1.204-7.773-1.807-12.834-1.807a63.018 63.018 0 0 0-20.065 3.254c-6.508 2.168-12.233 5.333-17.173 9.489-4.943 4.158-8.92 9.309-11.931 15.456-3.014 6.146-4.519 13.259-4.519 21.331 0 1.929.119 3.617.355 5.062.237 1.446.712 2.592 1.427 3.435-5.056 0-9.057-1.145-12.005-3.435C1.472 58.812 0 54.952 0 49.53c0-6.387 2.014-12.562 6.044-18.528 4.031-5.966 9.387-11.236 16.063-15.817 6.678-4.58 14.291-8.255 22.834-11.026C53.483 1.386 62.208 0 71.11 0c8.183 0 15.103 1.176 20.758 3.525s10.196 5.604 13.625 9.76c3.43 4.159 5.897 9.011 7.401 14.553 1.503 5.545 2.257 11.451 2.257 17.715 0 6.507-.749 13.558-2.24 21.149a125.204 125.204 0 0 1-6.655 22.416 104.222 104.222 0 0 1-11.194 20.788c-4.52 6.508-9.792 11.993-15.817 16.451a80.81 80.81 0 0 0 4.52 5.513 30.808 30.808 0 0 0 5.151 4.609c1.867 1.326 3.977 2.38 6.327 3.165 2.351.782 5.032 1.174 8.045 1.174.963 0 1.746-.031 2.35-.091a32.642 32.642 0 0 0 1.989-.272c-1.927 4.218-4.155 7.2-6.681 8.949-2.527 1.745-5.715 2.621-9.568 2.621-3.493 0-6.441-.571-8.847-1.717-2.407-1.147-4.455-2.622-6.138-4.429-1.687-1.807-3.132-3.858-4.335-6.147a125.299 125.299 0 0 1-3.43-7.049 49.952 49.952 0 0 1-9.568 2.982c-3.253.66-6.681.995-10.291.995-4.694 0-8.999-.664-12.911-1.988-3.912-1.327-7.312-3.436-10.199-6.328-2.89-2.891-5.115-6.626-6.68-11.209-1.565-4.577-2.347-10.181-2.347-16.81 0-4.818.449-10.272 1.352-16.359.9-6.085 2.253-12.293 4.059-18.619a132.241 132.241 0 0 1 6.765-18.439C31.514 40.943 34.7 35.641 38.37 31c3.666-4.638 7.756-8.375 12.266-11.208 4.511-2.831 9.533-4.248 15.067-4.248 1.322 0 2.762.09 4.327.271 1.564.183 3.189.575 4.872 1.177zm-24.466 96.893c-1.328 0-2.774.152-4.339.45-1.567.305-3.194.813-4.88 1.537 2.41 4.701 6.206 7.051 11.388 7.051 3.254 0 6.445-.903 9.582-2.71-1.327-1.927-2.924-3.464-4.79-4.611-1.872-1.144-4.191-1.717-6.961-1.717zM192.341 45.193l-13.197 61.46c-.604 2.412-.903 5.124-.903 8.134 0 2.051.362 3.918 1.084 5.605.724 1.688 2.229 2.53 4.52 2.53 2.892 0 5.812-1.745 8.767-5.242 2.953-3.492 5.754-8.318 8.407-14.463h6.688c-2.893 7.594-5.784 13.591-8.676 17.988-2.893 4.399-5.695 7.745-8.408 10.032-2.711 2.291-5.304 3.769-7.772 4.429-2.472.66-4.672.995-6.599.995-3.857 0-7.111-1.356-9.76-4.068-2.653-2.712-4.221-7.139-4.702-13.287-3.496 6.148-7.382 10.575-11.66 13.287-4.278 2.712-8.468 4.068-12.563 4.068-2.772 0-5.363-.576-7.773-1.717-2.412-1.144-4.519-2.74-6.327-4.791-1.808-2.048-3.226-4.578-4.248-7.595-1.026-3.008-1.537-6.385-1.537-10.121 0-2.893.362-5.967 1.085-9.221l12.292-58.024h18.257l-13.196 61.46a24.47 24.47 0 0 0-.723 5.966c0 3.496.783 6.086 2.35 7.773 1.565 1.688 3.494 2.53 5.785 2.53 3.494 0 7.078-1.717 10.757-5.151 3.674-3.437 6.174-8.285 7.5-14.554l12.293-58.024h18.259z"/><path d="M229.216 45.193l-13.195 61.46c-.605 2.412-.904 5.124-.904 8.134 0 2.051.362 3.918 1.085 5.605s2.228 2.53 4.52 2.53c2.892 0 5.813-1.745 8.767-5.242 2.952-3.492 5.755-8.318 8.406-14.463h6.689c-2.893 7.594-5.786 13.591-8.677 17.988-2.893 4.399-5.695 7.745-8.406 10.032-2.711 2.291-5.304 3.769-7.772 4.429-2.471.66-4.673.995-6.598.995-3.136 0-5.726-.542-7.774-1.628-2.05-1.084-3.677-2.53-4.88-4.338-1.206-1.809-2.08-3.917-2.621-6.327-.543-2.41-.815-4.999-.815-7.774 0-2.167.151-4.396.453-6.688.299-2.286.692-4.52 1.175-6.689l12.292-58.024h18.255zm-16.811-26.032c0-3.253 1.144-6.083 3.434-8.496 2.289-2.409 5.121-3.615 8.496-3.615 3.254 0 6.084 1.207 8.496 3.615 2.411 2.413 3.615 5.243 3.615 8.496 0 3.376-1.205 6.209-3.615 8.498-2.412 2.29-5.242 3.434-8.496 3.434-3.375 0-6.208-1.144-8.496-3.434-2.29-2.289-3.434-5.122-3.434-8.498z"/><path d="M286.52 72.849c1.565-.962 2.861-2.649 3.887-5.06 1.021-2.41 1.535-4.64 1.535-6.689s-.66-3.766-1.979-5.153c-1.319-1.384-3.358-2.077-6.115-2.077-4.198 0-8.001 1.716-11.419 5.151-3.418 3.435-6.328 7.714-8.725 12.834-2.399 5.125-4.257 10.667-5.576 16.631s-1.978 11.479-1.978 16.541c0 6.266 1.176 10.817 3.526 13.646 2.349 2.834 6.477 4.249 12.382 4.249 6.386 0 12.292-1.596 17.715-4.791 5.423-3.191 10.123-8.163 14.1-14.914h6.146c-2.412 4.462-5.305 8.709-8.676 12.746-3.376 4.039-7.081 7.591-11.118 10.665-4.041 3.072-8.347 5.514-12.925 7.321-4.581 1.807-9.281 2.712-14.099 2.712-3.498 0-6.852-.542-10.071-1.628a23.696 23.696 0 0 1-8.563-5.061c-2.494-2.289-4.502-5.271-6.023-8.948-1.519-3.674-2.279-8.163-2.279-13.467 0-3.374.361-7.291 1.085-11.751.723-4.457 1.836-9.007 3.345-13.647 1.505-4.639 3.463-9.249 5.874-13.829 2.41-4.579 5.361-8.646 8.858-12.202 3.494-3.554 7.529-6.417 12.112-8.588 4.578-2.168 9.761-3.254 15.546-3.254 6.146 0 10.846 1.387 14.1 4.158 3.253 2.774 4.881 7.112 4.881 13.015 0 4.22-.814 7.803-2.441 10.756-1.626 2.954-4.008 4.429-7.141 4.429-2.652.002-4.64-1.264-5.964-3.795z"/><path d="M341.833 9.038l-14.099 65.439 37.238-29.284h17.535l-35.792 24.764a22.44 22.44 0 0 1 1.716-.271c.543-.059 1.113-.09 1.718-.09 3.493 0 6.386.574 8.678 1.718 2.288 1.146 4.095 2.65 5.422 4.517 1.324 1.871 2.26 3.977 2.801 6.329.543 2.347.815 4.729.815 7.139 0 2.53-.212 4.91-.633 7.14a131.211 131.211 0 0 1-1.356 6.327 256.544 256.544 0 0 0-1.355 5.875 26.886 26.886 0 0 0-.634 5.786c0 3.253.661 5.484 1.989 6.686 1.325 1.207 3.132 1.81 5.423 1.81.723 0 1.655-.059 2.802-.18 1.144-.12 2.378-.48 3.706-1.087-.243 4.582-1.748 8.226-4.519 10.938-2.773 2.712-6.57 4.068-11.388 4.068-3.135 0-5.785-.542-7.955-1.628-2.169-1.084-3.917-2.53-5.242-4.338-1.327-1.809-2.322-3.917-2.983-6.327-.664-2.41-.994-4.939-.994-7.592 0-2.409.21-4.67.633-6.778.42-2.109.873-4.128 1.356-6.058.48-1.925.932-3.823 1.354-5.693.422-1.868.634-3.765.634-5.694 0-3.254-.665-5.604-1.988-7.051-1.328-1.446-3.195-2.168-5.604-2.168-6.87 0-12.957 4.641-18.258 13.919l-8.133 38.323h-18.078l26.573-124.008 18.618-2.531z"/></g><g fill="#29ABE2"><path d="M787.881 150.276l12.436-104H394.542l-12.437 104zM381.45 154.276l-1.09 10h405.776l1.091-10z"/></g><g fill="#FFF"><path d="M505.922 72.276c0 15.448-4.632 30.004-13.89 43.676-9.259 13.671-19.045 20.505-29.353 20.505-3.556 0-6.655-1.14-9.321-3.41-2.657-2.271-4.378-5.349-5.153-9.23-.333-1.554-.498-4.214-.498-7.985-6.546 13.751-14.805 20.626-24.783 20.626-4.436 0-8.097-1.33-10.978-3.992-2.886-2.663-4.326-6.044-4.326-10.148 0-5.43 1.551-11.695 4.659-18.796l9.979-22.951c1.664-3.88 2.497-7.042 2.497-9.481 0-2.995-1.278-4.49-3.825-4.49-2.224 0-5.049 1.454-8.485 4.36-3.438 2.908-6.045 6.063-7.815 9.462-.558 1.209-1.167 1.813-1.831 1.813-.666 0-1-.443-1-1.333 0-1.995 2.163-5.209 6.489-9.645 5.764-5.876 11.698-8.816 17.796-8.816 8.095 0 12.143 3.21 12.143 9.624 0 4.427-1.775 10.566-5.323 18.42l-9.814 21.571c-2.551 5.643-3.825 10.344-3.825 14.104 0 4.647 1.885 6.971 5.656 6.971 9.203 0 18.63-11.615 28.274-34.846l8.487-20.409 3.158-9.458c.332-1.324 1.104-2.044 2.328-2.156l1.999-.167 3.99-.497 4.66-.828c1.215-.222 1.717-.333 1.493-.333.886 0 1.333.333 1.333.998 0 .445-.225.89-.667 1.331-.561 1.11-1.164 2.494-1.83 4.158l-15.635 39.088c-2.442 6.099-3.661 11.089-3.661 14.969 0 5.434 2.388 8.15 7.153 8.15 7.984 0 16.689-7.817 26.111-23.451 6.988-11.644 10.48-22.896 10.48-33.767 0-2.437-.709-3.658-2.124-3.658-.22 0-.765.125-1.639.374-.216.083-.65.125-1.309.125-3.163 0-4.738-1.385-4.738-4.158 0-1.664.65-3.104 1.968-4.326 1.316-1.218 2.903-1.829 4.761-1.829 4.273-.003 6.409 3.277 6.409 9.835zM581.771 89.385c0 12.973-5.938 24.675-17.803 35.094-9.312 8.208-19.016 12.309-29.104 12.309-6.879 0-12.531-2.383-16.969-7.15-4.437-4.768-6.65-10.922-6.65-18.462 0-6.43 1.831-13.031 5.488-19.796 3.659-6.761 8.539-12.527 14.638-17.297 9.537-7.428 18.739-11.145 27.609-11.145 6.765 0 12.252 2.441 16.469 7.318 4.214 4.881 6.322 11.256 6.322 19.129zm-12.807-10.813c0-8.426-3.771-12.641-11.312-12.641-9.207 0-17.188 6.599-23.953 19.792-6.431 12.642-9.646 24.509-9.646 35.596 0 8.317 3.712 12.474 11.144 12.474 9.316 0 17.077-5.986 23.285-17.962 6.985-13.528 10.482-25.947 10.482-37.259zM652.624 70.256c0 2.221-.722 4.133-2.164 5.738-1.442 1.609-3.104 2.413-4.984 2.413-1.779 0-2.666-.609-2.666-1.83l.333-1.664c.219-.664.333-1.273.333-1.83 0-2.661-1.329-3.991-3.993-3.991-3.215 0-7.706 3.105-13.472 9.314-5.766 6.211-11.198 14.914-16.301 26.113l-11.975 26.284c-1.108 2.549-2.054 3.822-2.824 3.822-2.223-.332-3.939-.5-5.159-.5-1.886 0-3.386.168-4.492.5h-.995c-1 0-1.501-.222-1.501-.668 0-.109.168-.334.501-.664l.83-1.67 28.111-64.026c0-.889-.722-1.333-2.164-1.333h-.665c-.443.112-1.164.167-2.163.167h-1.663c-1.661 0-2.493-.388-2.493-1.164 0-.666 2.883-1.107 8.647-1.331 5.766-.222 9.649-.72 11.645-1.498.885-.22 1.388-.332 1.497-.332.666 0 1 .332 1 .998 0 .556-.726 2.607-2.164 6.153l-6.154 14.97c10.199-14.192 19.183-21.29 26.946-21.29 5.432.001 8.149 2.441 8.149 7.319zM789.511 75.247c0 1.886-.612 3.492-1.83 4.823-1.22 1.33-2.661 1.995-4.322 1.995-3.328 0-4.991-1.604-4.991-4.823 0-2.661 1.105-3.992 3.324-3.992.337 0 .862.167 1.584.499.721.334 1.301.501 1.744.501.665 0 .999-.38.999-1.145 0-1.85-1.278-3.649-3.825-5.39-2.556-1.742-5.158-2.614-7.819-2.614-3.547 0-6.546 1.136-8.983 3.402-2.438 2.269-3.656 5.008-3.656 8.215 0 2.765 2.605 10.457 7.814 23.065 1.223 2.988 1.835 6.361 1.835 10.122 0 7.525-2.557 13.83-7.654 18.92-5.104 5.086-11.477 7.633-19.127 7.633-6.652 0-12.226-1.86-16.718-5.573-4.491-3.713-6.737-8.289-6.737-13.723 0-3.102.918-5.655 2.748-7.65 1.826-1.995 4.127-2.995 6.898-2.995 2.108 0 3.911.724 5.404 2.164 1.501 1.441 2.246 3.159 2.246 5.154 0 3.327-1.606 4.99-4.82 4.99-3.438 0-5.155-1.164-5.155-3.493 0-.771.138-1.551.411-2.328.279-.776.42-1.218.42-1.33 0-1.108-.446-1.663-1.332-1.663-.995 0-1.912.747-2.744 2.246-.835 1.495-1.246 3.134-1.246 4.905 0 4.325 1.811 8.096 5.429 11.31 3.625 3.219 7.886 4.824 12.789 4.824 4.569 0 8.384-1.385 11.449-4.156 3.061-2.771 4.597-6.266 4.597-10.48 0-2.992-1.191-7.872-3.582-14.639-2.27-6.429-3.406-11.75-3.406-15.967 0-7.205 2.191-13.277 6.569-18.212 4.381-4.932 9.731-7.402 16.054-7.402 4.214 0 7.875 1.276 10.979 3.826 3.103 2.549 4.654 5.544 4.654 8.981z"/></g><path fill="none" d="M703.021 68.752c-2.329-1.991-4.935-2.987-7.82-2.987-8.207 0-16.574 6.859-25.111 20.574-8.098 12.941-12.143 23.892-12.143 32.85 0 8.075 3.661 12.112 10.979 12.112 6.427 0 12.746-4.479 18.958-13.44 4.436-6.304 8.262-13.661 11.479-22.065l3.826-9.789c2.219-5.641 3.327-9.125 3.327-10.454.001-2.543-1.168-4.811-3.495-6.801z"/><path fill="#29ABE2" d="M745.605 15.866c-.228 0-.67-.052-1.333.093-1.223.296-3.938.317-8.152.317h-14.133c-1.223 0-1.834.41-1.834.972 0 .564 1.055.956 3.159 1.05 3.551.223 5.633.453 6.24.619.606.167.917.657.917 1.437 0 .448-.229 1.508-.667 2.063l-9.633 23.859h14.47l9.634-23.88c.771-1.659 1.384-3.21 1.831-4.096.219-.442.383-.97.497-1.301 0-.662-.333-1.133-.996-1.133z"/><path fill="#FFF" d="M710.84 68.283l-1.165 2.235-.999 1.872c-2.329-6.762-7.043-10.216-14.138-10.216-10.201 0-20.902 5.221-32.101 15.731-12.42 11.617-18.633 23.937-18.633 36.992 0 6.309 1.956 11.416 5.864 15.343 3.907 3.928 8.944 5.888 15.109 5.888 5.067 0 9.227-1.239 12.969-3.707 3.74-2.469 7.484-6.616 11.484-12.432v4.822c0 7.099 4.403 10.646 12.716 10.646 6.544 0 12.261-2.105 16.921-6.319 3.771-3.438 5.715-6.099 5.715-7.986 0-.885-.357-1.33-1.134-1.33-.443 0-1.259.931-2.478 2.786-3.77 5.795-8.311 8.692-13.632 8.692-3.553 0-5.32-1.55-5.32-4.65 0-1.66 1.439-5.429 4.323-12.405l28.296-67.969h-14.47l-9.327 22.007zm-7.651 17.723l-3.826 9.789c-3.218 8.404-7.044 15.762-11.479 22.065-6.212 8.961-12.531 13.44-18.958 13.44-7.318 0-10.979-4.037-10.979-12.112 0-8.958 4.045-19.908 12.143-32.85 8.537-13.714 16.904-20.574 25.111-20.574 2.886 0 5.491.996 7.82 2.987 2.327 1.99 3.496 4.258 3.496 6.8 0 1.33-1.109 4.814-3.328 10.455z"/></svg>',
})

new Vue({
    el: '#app',
    data: {
        editing: null,
        snippets: [],
        search: '',
        status: 'Saving...',
        statusVisible: false,
        theme: 0,
    },
    watch: {
        snippets: {
            handler() {
                this.sendSnippetsToBackend()
            },
            deep: true,
        },
    },
    methods: {
        edit(snippet) {
            this.editing = snippet
        },
        add() {
            const newSnippet = {
                id: Math.floor(Math.random() * (9999999 - 1000000)) + 1000000,
                key: '',
                value: '',
                regex: false,
                type: 'plain',
            }

            this.snippets.push(newSnippet)
            this.editing = newSnippet
        },
        append(emoji) {
            this.editing.value += emoji
        },
        remove(snippet) {
            this.snippets = this.snippets.filter(s => s.id !== snippet.id)
            this.editing = null
        },
        save() {
            this.statusVisible = true
            this.status = 'Saving...'

            this.saved()
        },
        saved: _.debounce(function () {
            this.status = 'All changes saved!'

            this.hideStatus()
        }, 1000),
        hideStatus: _.debounce(function () {
            this.statusVisible = false
        }, 3000),
        sendSnippetsToBackend() {
            currentWindow.snippetsManager.updateSnippets(this.snippets)
        },
        changedType() {
            if (this.editing.type === 'js' && !this.editing.value) {
                this.editing.value = '/**\n * @param {string} trigger A string that was matched\n * @return {string} Replacement\n */\nfunction (trigger) {\n  return trigger.toUpperCase()\n}\n'
            }
        },
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            },
        },
    },
    created() {
        this.snippets = JSON.parse(JSON.stringify(currentWindow.snippetsManager.getSnippets()))
    },
})
