// Caller would request an integer value in the header of the request and return that index of the JSON

const express = require("express");
const cors = require("cors");
const app = express();
PORT = 3003;

app.use(cors())

const leetCodePatterns = {
	BFS: {
		patternName: "BFS",
		patternInfo: [ 
			"BFS is for finding a “Shortest Path” in an unweighted graph (only for unweighted graphs).",
			"A quote from LeetCode: “finding the SP btw 2 nodes in a graph is almost always done using BFS and all programmers should know this.”",
			"We prefer BFS over DFS for SP problems because it's faster.",
			"If needed, we can convert a weighted graph into an unweighted graph by breaking up all of the edges into a bunch of edges where each edge has length 1."
    ],
		patternMoreInfo: [
			"Step 1: set up a queue and put the root node in it.",
			"Step 2: popleft() off of the queue.",
			"Step 3: grab that previous nodes' children and put them in the queue.",
			"Step 4: space optimize if the problem allows it (we may only need to keep track of the previous 2 levels of a BFS search."
    ],
		patternSources: [ 
			"Problem 1: SP in a binary matrix",
			"Problem 2: Find if path exists in graph"
    ]
	},
	DFS: {
		patternName: "DFS",
		patternInfo: [ 
			"DFS is for traversing all nodes in a graph or for traversing all paths btw any 2 nodes in a graph.",
			"We tend to choose DFS over BFS when we want to find ALL Paths or when we just want to find any Path (and we don’t care if that path is the SP or not).",
			"And when we simply must visit ALL nodes, then either BFS or DFS can be used, but DFS code tends to look cleaner.",
			"For very deep graphs, we'll want to go with iteration and a stack in order to avoid the potential stack overflow of recursion.",
			"DFS can also be used for graph cycle detection: if we traverse to a neighbor node that is already in the stack, then this graph has a cycle."
    ],
		patternMoreInfo: [
		 	"Step 1: Start a DFS from any node and mark that node as 'visited.' Remember: for directed graphs we don't need to mark nodes as visited since we can't traverse backwards.",
			"Step 2: Put all of that nodes' neighbors in the stack.",
			"Step 3: Pop one of those neighbors off the stack and traverse to that next node (and mark this new node as visited).",
			"Step 4: Repeat this process until all nodes have been traversed (when the stack is empty). If the stack is empty, but there're still nodes we haven't traversed, then the graph is disconnected somewhere."
    ],
		patternSources: [ 
			"Problem 1: All paths from source to target",
			"Problem 2: Clone graph"
    ]
	},
	DP: {
		patternName: "Dynamic Programming",
		patternInfo: [
			"It is common for DP problems to ask for a max/min of something. Any time we see 'how many ways are there to do...' or 'is it possible to reach a certain point...' then we should consider DP. And remember: any time we see a 'number of possible ways' problem, we should think that there may be a math combinatorics solution also.",
			"Whenever we think the problem is a DP problem, we should first think 'can I solve this greedily?' If a greedy tek exists in the problem, it will almost always be faster than the DP solution.",
			"It is a feature of DP that future decisions depend on earlier decisions. This is what differentiates a DP problem from a Greedy problem. The Greedy solution does not have this sort of sub-problem dependency, it simply takes the best local option and doesn't worry about how that decision affects the global solution.",
			"Any DP problem can be solved using Top-Down or Bottom-Up teks. See steps in the 'more info' section.",
			"Top-Down DP: is recursive and is going to first run all the way down the recursion, and then it'll start calculating the values to store in the memo table. So as it walks back up the recursion, it'll keep storing the memo for the next value. Top-Down starts by handling the overall problem, but since it does not yet have the solutions to the smaller sub-problems, it must make recursive calls to obtain those solutions and build them up to the overall problem.",
			"Bottom-Up DP: is iterative and is going to start by handling the smallest sub-problem. As it walks up to the overall problem, it'll store each sub-problem state in the memo table. It'll iteratively calculate the next memo table value based on the previous values.",
			"Time/Space Complexity: with DP we never repeat calculations, so the complexity is actually simple:  # of sub-problems * time it takes to calculate each sub-problem. We only compute each state once, so the complexity is always tied to the number of possible states. And whenever we compute a state, we store it, so the Space Complexity is equal to the number of states stored. So any way that we can reduce the number of states will give us more efficient DP algos.",
			"Pathing through a matrix: DP will be applicable here when we are prevented from moving backwards. E.g.: when we can only move down and right through the matrix. This is just like moving through a 2D memo table, each of these cells is a sub-problem, and we working our way to the very last cell which represents the solution to the overall problem. If we are able to move in all 4 directions, then this is probably a graph/BFS problem instead."
    ],
		patternMoreInfo: [
			"Step 1: set up recursive BT solution",
			"Step 2: optimize this with a memo table for Top-Down DP",
			"Step 3: remove the recursion for Bottom-Up DP",
			"Step 4: apply extra tricks to reduce Time/Space complexity"
    ],
		patternSources: [
			"Problem 1: Longest Common Subsequence",
			"Problem 2: Longest Increasing Subsequence"
    ]
	},
	BT: {
		patternName: "BackTracking",
		patternInfo: [
			"BT is a brute force DFS algo, and it always uses recursion. We use DP for an optimal solution, but if the problem asks for 'all solutions,' then this is BT. Any time the problem asks for all 'perms/combos/subsets' of some input, we should think 'BackTracking.'", 
			"If you notice that a decision in the problem affects future choices (like DP), and that these choices will be all-correct or all-wrong depending on some previous choice made, then this is BT.",
			"BT is basically DFS except that it abandons a path right when it finds out that that path can't provide a solution.",
			"Recursion is a way of 'saving state,' as we move deeper into the recursion we 'lock-in' that previous state and move on to the next one. This is why we're able to backtrack, we can move back to a previous state to try another DFS route."
    ],
		patternMoreInfo: [
			"Step 1: make a change",
			"Step 2: recurse",
			"Step 3: undo that change"
    ],
		patternSources: [
			"Problem 1: N-Queens",
			"Problem 2: Subsets",
			"Problem 3: Sudoku Solver"
    ]
	},
	UF: {
		patternName: "Union find",
		patternInfo: [
			"aka: Disjoint Set",
			"UF is mostly used for graph connectiivty problems. So anytime we need to figure out if 2 elements are in the same group or not, this is UF. If we know that 2 nodes are in the same group, then we know that there exists some path that connects these 2 nodes.",
			"MST algos like Kruskal's also utilize UF to generate their min-spanning trees.",
			"UF can also be used for graph cycle detection."
    ],
		patternMoreInfo: [
			"Step 1: iterate through all nodes and ask each node who its 'representative node' is. At the start we just set each node to be its own representative of itself, so that node is the root node of the subset that only contains itself.",
			"Step 1: each set/group has a 'rep node' that serves as the 'root node' of that set.",
			"Step 2: then when we want to check if 2 given elements are connected, we just ask each of them who their 'rep node' is and if they have the same answer then we know they are connected.",
			"Step 3: so use find(u) and find(v) to find who the 'rep node' of node u and node v is, and if they have the same 'rep node' then these 2 subsets can be joined together with the union(u,v) method. The Union method brings all elements of 2 subsets together under the same 'rep node.'",
			"Step 4: for cycle detection we can traverse the edges of the graph, if the 2 nodes on each side of that edge were already in the same subset, then this means that these nodes were already conected through some path that is not this current edge, so the graph has a cycle"
    ],
		patternSources: [
			"Problem 1: Number of Provinces  (video in Explore section)",
			"Problem 2: Largest component size by common factor"
    ]
	},
	FSP: {
		patternName: "Fast & Slow Pointers",
		patternInfo: [
			"aka Floyd's cycle detection algo",
			"Any time we see 'detect if there is a cycle,' we should consider FS Pointers.",
			"This algo has many uses: Finding the half-way point of something, Return the first/last k elements of some sequence, Find the K'th element of a sequence, Detect a cycle in some sequence.",
			"note: we can also use a hashmap to detect a cycle in a sequence by continuously checking if the next value is already in the hashmap, but the hashmap tek is O(n) space whereas FS Pointers is O(1) space."
    ],
		patternMoreInfo: [
			"Step 1: set up a Fast pointer and a Slow pointer",
			"step 2: profit"
    ],
		patternSources: [
			"Problem 1: Happy Number",
			"Problem 2: Middle of the LL",
			"Problem 3: LL cycle"
    ]
	},
	SW: {
		patternName: "Sliding Window",
		patternInfo: [
			"We usually use 2 pointers for this, and we usually store our current 'best' answer in a hashmap as we move along.",
			"SW problems usually feature arrays/strings and getting some sort of subset of these arrays/strings.",
			"SW can only be used when the size of the window stays fixed."
    ],
		patternMoreInfo: [
			"Step 1: set up 2 pointers as the edges of a window of size K",
			"Step 2: increment both pointers to check the next subset/group of K elements, store the 'best' answer as the window moves along"
    ],
		patternSources: [
			"Problem 1: Best time to buy and sell stock",
			"Problem 2: Repeated DNA sequences",
			"Problem 3: Minimum size subarray sum"
    ]
	},
	CS: {
		patternName: "Cyclic Sort",
		patternInfo: [
			"CS problems will ALWAYS mention some sort of range that the given values are in. So anytime we're given values with 'range from 1 to n,' this is ALWAYS CS.",
			"And especially when the problem requires O(1) space and O(n) - this is ALWAYS CS.",
			"Any time we need to: determine the order the numbers should be in, find missing number, or find duplicate numbers - these can all be done in O(n) with CS.",
			"CS handles perms really well cuz all perms are really just a bunch of cyclic rotations of each other.",
			"note: be careful about dealing with a 1 to n range when your array is 0-indexed."
    ],
		patternMoreInfo: [
			"Step 1: if we know that our input array has a range from 1 to n, then we can just map our array values to indices like a DAA (account for 0-indexing also).",
			"Step 2: repeatedly swap these input values to where they should be (in this DAA) until the whole array is sorted.",
			"Step 3: and right after we put a value in its correct relative position in the DAA, we just check to make sure it has the same value as the index (or index-1).",
			"Step 4: we do these steps in 1 pass through the input array, so O(n) time."
    ],
		patternSources: [
			"Problem 1: Missing number",
			"Problem 2: First missing positive",
			"Problem 3: Find the duplicate number"
    ]
	},
	TKE: {
		patternName: "Top K'th Element",
		patternInfo: [
			"This is a problem type that can be solved via 3 diff methods:  Heaps, BFS/DFS, Quick Select.",
			"Heaps: we only need to build a heap of size k here, and this will keep the time down to log(k) instead of log(n) (where k < n usually). We can simply pop() off the values that we don't want and then what's left on top of our heap is the K'th value(s) that we want.",
			"BFS/DFS: if we're finding this K value in a BST, then this will be a BFS/DFS in-order traversal problem (and we can do this recursively or iteratively). Since we traverse in-order, what we return will then be an array sorted in increasing order, and then we simply grab our K'th value(s) from that sorted array.",
			"Quick Select: this is an O(n) algo widely used in industry for: find K'th something, find K'th smallest/largest, find K'th most/least frequent."
    ],
		patternMoreInfo: [
			"Step 1: all of the algos for these problems are just diff ways of getting the input sorted in increasing order",
			"Step 2: then just grab the K'th element(s) from that sorted array"
    ],
		patternSources: [
			"Problem 1: K'th largest element in a stream",
			"Problem 2: Top K frequent elements",
			"Problem 3: K'th smallest element in a BST"
    ]
	},
	QS: {
		patternName: "Quick Select",
		patternInfo: [
			"This is an O(n) algo widely used in industry for: find K'th something, find K'th smallest/largest, find K'th most/least frequent.",
			"It uses the same approach as Quick Sort:  it keeps choosing a 'pivot' whose position is decided via some 'partition algo.'",
			"Quick Sort review: Quick Sort keeps choosing a pivot and it places all 'less' items to the left of that pivot and all 'more' items to the right of that pivot. So that pivot itself is now definitely at its correctly sorted index relative to all other items, but those other items are not yet in their correct position, so Quick Sort will continue this process on both sides of the pivot until the entire array is sorted.",
			"But Quick Select doesn't need to sort the entire array, cuz we are already given some K that the algo can aim for, so it can stop right after finding that K.",
			"There are many 'partition algos' which place the pivot in the 'most ideal' position, but the simplest is Lomuto's.", 
			"Time Complexity: Quick Select is dependent on Quick Sort, so they have the same timing. Quick Sort has O(n^2) time when pivot selection is really bad, but the partition algos are designed to avoid this, thus both Quick Sort and Quick Select almost always run in their O(n) average run time, hence their wide use in practice."
    ],
		patternMoreInfo: [
			"Step 1: place the pivot using some partition algo (Lomuto's uses 2 pointers to swap elements).",
			"Step 2: we keep comparing the value at the pivot index to our K value, and if pivot index is < K, then K is somewhere on the right side of the pivot, and we only need to perform Quick Sort on the right side of our pivot, so the problem sizekeeps halving until we hit our K value, just like BS."
    ]
	}

}

app.get("/get/:_name", (req, res) => {
  const obj = leetCodePatterns[req.params._name];
  if (obj) {
    res.json(obj);
  } else {
    res.status(404).send("Error. LeetCode module not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
