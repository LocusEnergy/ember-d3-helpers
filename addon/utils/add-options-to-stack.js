export default function addOptionsToStack(stack, hash) {
  if ('keys' in hash) {
    stack.keys(hash.keys);
  }

  if ('value' in hash) {
    stack.value(hash.value);
  }

  if ('order' in hash) {
    stack.order(hash.order);
  }

  if ('offset' in hash) {
    stack.offset(hash.offset);
  }

  return stack;
}
