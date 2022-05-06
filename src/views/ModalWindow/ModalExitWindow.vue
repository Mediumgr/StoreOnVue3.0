<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <h2>Do you really want to logout ?</h2>
        </header>
        <section class="modal-footer">
          <button
            type="button"
            class="btn-red"
            @click="$emit('confirm')"
            aria-label="Close modal"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn-green"
            @click="$emit('close')"
            aria-label="Close modal"
          >
            No
          </button>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["confirm", "close"],
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  text-align: center;
}

.modal {
  width: 300px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: space-evenly;
}

.btn-green {
  width: 50px;
  height: 30px;
  color: white;
  background: #4aae9b;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}

.btn-red {
  width: 50px;
  height: 30px;
  color: white;
  background: #ce1010;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
