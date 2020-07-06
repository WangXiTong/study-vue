// 对象响应式原理
// 1.Object.defineProperty()
function defineReactive(obj, key, val) {
  // val可能是对象 需要递归处理
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", newVal);
        observe(newVal);
        val = newVal;
      }
    },
  });
}

// 对象响应式处理
function observe(obj) {
  // 判断传入的obj是不是对象
  if (typeof obj !== "object" || obj == null) {
    return;
  }

  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 }, arr: ["a", "b"] };
observe(obj);

// obj.foo;
// obj.foo = "aaaaa";
// obj.bar;

// obj.baz.a = "111";
// obj.baz = { a: 2222 };
// obj.baz.a = 100;

// obj.dong = "dong";
// obj.dong;

// set(obj, "dong", "dong");
// obj.dong;

// obj.arr[1];
