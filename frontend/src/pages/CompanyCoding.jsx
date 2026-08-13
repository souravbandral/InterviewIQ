import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const questions = [
  // ==================== GOOGLE ====================

  {
    company: "Google",
    type: "MNC",
    question: "Two Sum",
    topic: "Arrays / HashMap",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target, return the indices of two numbers that add up to the target.",
    code: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int needed = target - nums[i];

            if (map.containsKey(needed)) {
                return new int[]{map.get(needed), i};
            }

            map.put(nums[i], i);
        }

        return new int[]{};
    }
}`,
  },

  {
    company: "Google",
    type: "MNC",
    question: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    description:
      "Check whether brackets in a string are correctly balanced and properly nested.",
    code: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {

            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;

                char top = stack.pop();

                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }

        return stack.isEmpty();
    }
}`,
  },

  // ==================== AMAZON ====================

  {
    company: "Amazon",
    type: "MNC",
    question: "Maximum Subarray",
    topic: "Arrays / Dynamic Programming",
    difficulty: "Medium",
    description:
      "Find the contiguous subarray having the largest possible sum.",
    code: `class Solution {
    public int maxSubArray(int[] nums) {

        int current = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }

        return best;
    }
}`,
  },

  {
    company: "Amazon",
    type: "MNC",
    question: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    description:
      "Reverse a singly linked list and return the new head.",
    code: `class Solution {

    static class ListNode {
        int val;
        ListNode next;

        ListNode(int val) {
            this.val = val;
        }
    }

    public ListNode reverseList(ListNode head) {

        ListNode previous = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;

            current.next = previous;

            previous = current;
            current = next;
        }

        return previous;
    }
}`,
  },

  // ==================== MICROSOFT ====================

  {
    company: "Microsoft",
    type: "MNC",
    question: "Binary Tree Level Order Traversal",
    topic: "Trees / BFS",
    difficulty: "Medium",
    description:
      "Return the values of a binary tree level by level.",
    code: `import java.util.*;

class Solution {

    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int val) {
            this.val = val;
        }
    }

    public List<List<Integer>> levelOrder(TreeNode root) {

        List<List<Integer>> result = new ArrayList<>();

        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {

            int size = queue.size();
            List<Integer> level = new ArrayList<>();

            for (int i = 0; i < size; i++) {

                TreeNode node = queue.poll();
                level.add(node.val);

                if (node.left != null)
                    queue.offer(node.left);

                if (node.right != null)
                    queue.offer(node.right);
            }

            result.add(level);
        }

        return result;
    }
}`,
  },

  {
    company: "Microsoft",
    type: "MNC",
    question: "Longest Substring Without Repeating Characters",
    topic: "Strings / Sliding Window",
    difficulty: "Medium",
    description:
      "Find the length of the longest substring that contains no repeated characters.",
    code: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {

        HashSet<Character> set = new HashSet<>();

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < s.length(); right++) {

            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }

            set.add(s.charAt(right));

            maxLength = Math.max(
                maxLength,
                right - left + 1
            );
        }

        return maxLength;
    }
}`,
  },

  // ==================== META ====================

  {
    company: "Meta",
    type: "MNC",
    question: "Merge Intervals",
    topic: "Arrays / Sorting",
    difficulty: "Medium",
    description:
      "Merge all overlapping intervals.",
    code: `import java.util.*;

class Solution {

    public int[][] merge(int[][] intervals) {

        if (intervals.length <= 1)
            return intervals;

        Arrays.sort(
            intervals,
            (a, b) -> Integer.compare(a[0], b[0])
        );

        List<int[]> result = new ArrayList<>();

        int start = intervals[0][0];
        int end = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {

            if (intervals[i][0] <= end) {
                end = Math.max(end, intervals[i][1]);
            } else {
                result.add(new int[]{start, end});

                start = intervals[i][0];
                end = intervals[i][1];
            }
        }

        result.add(new int[]{start, end});

        return result.toArray(new int[result.size()][]);
    }
}`,
  },

  {
    company: "Meta",
    type: "MNC",
    question: "Binary Search",
    topic: "Arrays / Searching",
    difficulty: "Easy",
    description:
      "Find the position of a target value in a sorted array.",
    code: `class Solution {

    public int search(int[] nums, int target) {

        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {

            int mid = left + (right - left) / 2;

            if (nums[mid] == target)
                return mid;

            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }
}`,
  },

  // ==================== ADOBE ====================

  {
    company: "Adobe",
    type: "MNC",
    question: "First Non-Repeating Character",
    topic: "Strings / HashMap",
    difficulty: "Easy",
    description:
      "Find the first character that appears only once in a string.",
    code: `import java.util.*;

class Solution {

    public char firstNonRepeating(String s) {

        HashMap<Character, Integer> map =
            new HashMap<>();

        for (char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        for (char c : s.toCharArray()) {
            if (map.get(c) == 1)
                return c;
        }

        return '\\0';
    }
}`,
  },

  {
    company: "Adobe",
    type: "MNC",
    question: "Move Zeroes",
    topic: "Arrays",
    difficulty: "Easy",
    description:
      "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.",
    code: `class Solution {

    public void moveZeroes(int[] nums) {

        int index = 0;

        for (int num : nums) {
            if (num != 0) {
                nums[index++] = num;
            }
        }

        while (index < nums.length) {
            nums[index++] = 0;
        }
    }
}`,
  },

  // ==================== TCS ====================

  {
    company: "TCS",
    type: "Service-Based",
    question: "Find the Second Largest Element",
    topic: "Arrays",
    difficulty: "Easy",
    description:
      "Find the second largest distinct element in an integer array.",
    code: `class Solution {

    public int secondLargest(int[] arr) {

        int largest = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;

        for (int num : arr) {

            if (num > largest) {
                second = largest;
                largest = num;
            }
            else if (num > second && num != largest) {
                second = num;
            }
        }

        return second;
    }
}`,
  },

  {
    company: "TCS",
    type: "Service-Based",
    question: "Check Palindrome String",
    topic: "Strings",
    difficulty: "Easy",
    description:
      "Check whether a given string reads the same forward and backward.",
    code: `class Solution {

    public boolean isPalindrome(String s) {

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {

            if (s.charAt(left) != s.charAt(right))
                return false;

            left++;
            right--;
        }

        return true;
    }
}`,
  },

  // ==================== INFOSYS ====================

  {
    company: "Infosys",
    type: "Service-Based",
    question: "Count Frequency of Elements",
    topic: "HashMap / Arrays",
    difficulty: "Easy",
    description:
      "Count how many times each element occurs in an array.",
    code: `import java.util.*;

class Solution {

    public void countFrequency(int[] arr) {

        HashMap<Integer, Integer> map =
            new HashMap<>();

        for (int num : arr) {
            map.put(
                num,
                map.getOrDefault(num, 0) + 1
            );
        }

        for (Map.Entry<Integer, Integer> entry
                : map.entrySet()) {

            System.out.println(
                entry.getKey() + " : " +
                entry.getValue()
            );
        }
    }
}`,
  },

  {
    company: "Infosys",
    type: "Service-Based",
    question: "Reverse an Array",
    topic: "Arrays",
    difficulty: "Easy",
    description:
      "Reverse an array in-place without using another array.",
    code: `class Solution {

    public void reverse(int[] arr) {

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {

            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }
    }
}`,
  },

  // ==================== WIPRO ====================

  {
    company: "Wipro",
    type: "Service-Based",
    question: "Fibonacci Series",
    topic: "Recursion / Dynamic Programming",
    difficulty: "Easy",
    description:
      "Generate the first N numbers of the Fibonacci sequence.",
    code: `class Solution {

    public void fibonacci(int n) {

        int a = 0;
        int b = 1;

        for (int i = 0; i < n; i++) {

            System.out.print(a + " ");

            int next = a + b;
            a = b;
            b = next;
        }
    }
}`,
  },

  {
    company: "Wipro",
    type: "Service-Based",
    question: "Find Missing Number",
    topic: "Arrays / Mathematics",
    difficulty: "Easy",
    description:
      "An array contains numbers from 0 to N with one number missing. Find the missing number.",
    code: `class Solution {

    public int missingNumber(int[] nums) {

        int n = nums.length;
        int xor = n;

        for (int i = 0; i < n; i++) {
            xor ^= i;
            xor ^= nums[i];
        }

        return xor;
    }
}`,
  },

  // ==================== ACCENTURE ====================

  {
    company: "Accenture",
    type: "Service-Based",
    question: "Check Anagram",
    topic: "Strings / Sorting",
    difficulty: "Easy",
    description:
      "Determine whether two strings contain the same characters with the same frequencies.",
    code: `import java.util.*;

class Solution {

    public boolean isAnagram(
        String s,
        String t
    ) {

        if (s.length() != t.length())
            return false;

        char[] a = s.toCharArray();
        char[] b = t.toCharArray();

        Arrays.sort(a);
        Arrays.sort(b);

        return Arrays.equals(a, b);
    }
}`,
  },

  {
    company: "Accenture",
    type: "Service-Based",
    question: "Find Duplicate Elements",
    topic: "Arrays / HashSet",
    difficulty: "Easy",
    description:
      "Find duplicate values present in an integer array.",
    code: `import java.util.*;

class Solution {

    public void findDuplicates(int[] arr) {

        HashSet<Integer> seen =
            new HashSet<>();

        HashSet<Integer> duplicates =
            new HashSet<>();

        for (int num : arr) {

            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }

        System.out.println(duplicates);
    }
}`,
  },

  // ==================== COGNIZANT ====================

  {
    company: "Cognizant",
    type: "Service-Based",
    question: "Prime Number Check",
    topic: "Mathematics",
    difficulty: "Easy",
    description:
      "Check whether a given number is prime.",
    code: `class Solution {

    public boolean isPrime(int n) {

        if (n < 2)
            return false;

        for (int i = 2; i * i <= n; i++) {

            if (n % i == 0)
                return false;
        }

        return true;
    }
}`,
  },

  {
    company: "Cognizant",
    type: "Service-Based",
    question: "Remove Duplicates from Sorted Array",
    topic: "Arrays / Two Pointers",
    difficulty: "Easy",
    description:
      "Remove duplicate elements from a sorted array in-place.",
    code: `class Solution {

    public int removeDuplicates(int[] nums) {

        if (nums.length == 0)
            return 0;

        int index = 1;

        for (int i = 1; i < nums.length; i++) {

            if (nums[i] != nums[i - 1]) {
                nums[index++] = nums[i];
            }
        }

        return index;
    }
  }`,
  },
];

function CompanyCoding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const companyFromUrl = searchParams.get("company");
  const validCompanies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Meta",
    "Adobe",
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
  ];

  const initialCompany = validCompanies.includes(companyFromUrl)
    ? companyFromUrl
    : "All";

  const [companyFilter, setCompanyFilter] = useState(initialCompany);
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const companies = [
    "All",
    "Google",
    "Amazon",
    "Microsoft",
    "Meta",
    "Adobe",
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
  ];

  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {

      const matchesCompany =
        companyFilter === "All" ||
        item.company === companyFilter;

      const matchesType =
        typeFilter === "All" ||
        item.type === typeFilter;

      const matchesDifficulty =
        difficultyFilter === "All" ||
        item.difficulty === difficultyFilter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        item.question.toLowerCase().includes(searchText) ||
        item.topic.toLowerCase().includes(searchText) ||
        item.company.toLowerCase().includes(searchText);

      return (
        matchesCompany &&
        matchesType &&
        matchesDifficulty &&
        matchesSearch
      );
    });
  }, [
    companyFilter,
    typeFilter,
    difficultyFilter,
    search,
  ]);

  const difficultyClass = (difficulty) => {
    if (difficulty === "Easy")
      return "bg-green-500/20 text-green-400";

    if (difficulty === "Medium")
      return "bg-yellow-500/20 text-yellow-400";

    return "bg-red-500/20 text-red-400";
  };

  return (
    <div className="min-h-screen bg-black text-white px-5 md:px-10 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              💻 Company Coding Practice
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Practice commonly asked coding and DSA problems
              for top companies.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold"
          >
            ← Dashboard
          </button>

        </div>


        {/* COMPANY SUMMARY */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-5 rounded-2xl">
            <p className="text-sm opacity-80">Companies</p>
            <p className="text-3xl font-bold mt-1">10</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">
            <p className="text-sm text-gray-400">MNCs</p>
            <p className="text-3xl font-bold mt-1">5</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">
            <p className="text-sm text-gray-400">Service Based</p>
            <p className="text-3xl font-bold mt-1">5</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">
            <p className="text-sm text-gray-400">Problems</p>
            <p className="text-3xl font-bold mt-1">
              {questions.length}
            </p>
          </div>

          <div className="bg-gray-900 p-5 rounded-2xl">
            <p className="text-sm text-gray-400">Language</p>
            <p className="text-3xl font-bold mt-1">Java</p>
          </div>

        </div>


        {/* FILTERS */}

        <div className="bg-gray-900 p-6 rounded-2xl mb-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="🔎 Search question, topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
            >
              {companies.map((company) => (
                <option key={company}>
                  {company}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
            >
              <option>All</option>
              <option>MNC</option>
              <option>Service-Based</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(e.target.value)
              }
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3"
            >
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>


        {/* RESULTS */}

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Coding Problems
          </h2>

          <p className="text-gray-400">
            {filteredQuestions.length} problems
          </p>

        </div>


        <div className="space-y-5">

          {filteredQuestions.map((item, index) => {

            const uniqueId =
              `${item.company}-${item.question}`;

            const isOpen = openQuestion === uniqueId;

            return (

              <div
                key={uniqueId}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
              >

                {/* QUESTION HEADER */}

                <button
                  onClick={() =>
                    setOpenQuestion(
                      isOpen ? null : uniqueId
                    )
                  }
                  className="w-full text-left p-6 hover:bg-gray-800/60 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div>

                      <div className="flex flex-wrap items-center gap-2 mb-3">

                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                          {item.company}
                        </span>

                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                          {item.type}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyClass(
                            item.difficulty
                          )}`}
                        >
                          {item.difficulty}
                        </span>

                      </div>

                      <h3 className="text-2xl font-bold">
                        {item.question}
                      </h3>

                      <p className="text-gray-400 mt-2">
                        {item.topic}
                      </p>

                    </div>

                    <div className="text-2xl">
                      {isOpen ? "▲" : "▼"}
                    </div>

                  </div>

                </button>


                {/* SOLUTION */}

                {isOpen && (

                  <div className="border-t border-gray-800 p-6">

                    <h4 className="text-xl font-bold mb-3">
                      📝 Problem
                    </h4>

                    <p className="text-gray-300 leading-7 mb-7">
                      {item.description}
                    </p>


                    <div className="flex items-center justify-between mb-3">

                      <h4 className="text-xl font-bold">
                        💡 Java Solution
                      </h4>

                      <span className="text-gray-500 text-sm">
                        Practice this yourself first
                      </span>

                    </div>

                    <pre className="bg-black border border-gray-800 rounded-xl p-5 overflow-x-auto text-sm leading-6 text-green-300">
                      <code>{item.code}</code>
                    </pre>

                  </div>

                )}

              </div>

            );
          })}

        </div>


        {/* NO RESULTS */}

        {filteredQuestions.length === 0 && (

          <div className="bg-gray-900 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-4">
              🔎
            </div>

            <h2 className="text-2xl font-bold">
              No problems found
            </h2>

            <p className="text-gray-400 mt-2">
              Try changing your search or filters.
            </p>

          </div>

        )}


        {/* FOOTER */}

        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-7 text-center">

          <h2 className="text-2xl font-bold">
            🚀 Interview Preparation Tip
          </h2>

          <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
            Don't just memorize solutions. First understand the
            approach, write the solution yourself, and then
            analyze the time and space complexity.
          </p>

        </div>

      </div>

    </div>
  );
}

export default CompanyCoding;