var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = StructWalk","category":"page"},{"location":"#StructWalk","page":"Home","title":"StructWalk","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for StructWalk.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [StructWalk]","category":"page"},{"location":"#StructWalk.LeafNode","page":"Home","title":"StructWalk.LeafNode","text":"LeafNode(x)\n\nspecial type for marking non-leaf value as leaf. Use with prewalk.\n\nSee also: prewalk\n\n\n\n\n\n","category":"type"},{"location":"#StructWalk.WalkStyle","page":"Home","title":"StructWalk.WalkStyle","text":"Abstract type WalkStyle\n\nSubtype WalkStyle and overload walkstyle to define custom walking behaviors (constructor / children /...).\n\n\n\n\n\n","category":"type"},{"location":"#StructWalk.children-Tuple{Any}","page":"Home","title":"StructWalk.children","text":"children(s::WalkStyle, x)\n\nReturn the children of x, which would be feeded to constructor(s, x). If x is an container type like Array,  it can return a tuple of itself and set iscontainer(s, x) to true.\n\nSee also: constructor, iscontainer\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.constructor-Tuple{Any}","page":"Home","title":"StructWalk.constructor","text":"constructor(s::WalkStyle, x)\n\nReturn the constructor for x, which would be applied to children(s, x).\n\nSee also: children, iscontainer\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.iscontainer-Tuple{Any}","page":"Home","title":"StructWalk.iscontainer","text":"iscontainer(s::WalkStyle, x)\n\nReturn a Bool indicating whether children(x) return a tuple of itself or not.\n\nSee also: constructor, children\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.mapleaves-Tuple{Any, Any}","page":"Home","title":"StructWalk.mapleaves","text":"mapleaves(f, [style = WalkStyle], x)\n\nApply f to each leaf nodes in x and return the result.  f only see leaf nodes.\n\nExample\n\njulia> mapleaves(x -> @show(x) isa Integer ? x + 1 : x, (a=2, b=(c=4, d=0)))\nx = 2\nx = 4\nx = 0\n(a = 3, b = (c = 5, d = 1))\n\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.mapnonleaves-Tuple{Any, Any}","page":"Home","title":"StructWalk.mapnonleaves","text":"mapnonleaves(f, [style = WalkStyle], x)\n\nApply f to each non-leaf in x and return the result.  f only see non-leaf nodes.\n\nExample\n\njulia> StructWalk.mapnonleaves(x -> @show(x) isa Integer ? x + 1 : x, (a=2, b=(c=4, d=0)))\nx = (c = 4, d = 0)\nx = (a = 2, b = (c = 4, d = 0))\n(a = 2, b = (c = 4, d = 0))\n\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.postwalk-Tuple{Any, Any}","page":"Home","title":"StructWalk.postwalk","text":"postwalk(f, [style = WalkStyle], x)\n\nApply f to each node in x and return the result.  f sees the leaves first and then the transformed node.\n\nExample\n\njulia> postwalk(x -> @show(x) isa Integer ? x + 1 : x, (a=2, b=(c=4, d=0)))\nx = 2\nx = 4\nx = 0\nx = (c = 5, d = 1)\nx = (a = 3, b = (c = 5, d = 1))\n(a = 3, b = (c = 5, d = 1))\n\njulia> postwalk(x -> @show(x) isa Integer ? x + 1 : x .+ 1, (3, 5))\nx = 3\nx = 5\nx = (4, 6)\n(5, 7)\n\njulia> postwalk(x -> @show(x) isa Integer ? x // 2 : x isa Tuple ? =>(x .+ 1...) : x, (3, 5))\nx = 3\nx = 5\nx = (3//2, 5//2)\n5//2 => 7//2\n\n\nSee also: prewalk\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.prewalk-Tuple{Any, Any}","page":"Home","title":"StructWalk.prewalk","text":"prewalk(f, [style = WalkStyle], x)\n\nApply f to each node in x and return the result.  f sees the node first and then the transformed leaves.\n\nNotice that it is possible it walk infinitely if you transform a node into non-leaf value.  Wrapping the non-leaf value with LeafNode(y) in f to prevent infinite walk.\n\nExample\n\njulia> prewalk(x -> @show(x) isa Integer ? x + 1 : x, (a=2, b=(c=4, d=0)))\nx = (a = 2, b = (c = 4, d = 0))\nx = 2\nx = (c = 4, d = 0)\nx = 4\nx = 0\n(a = 3, b = (c = 5, d = 1))\n\njulia> prewalk(x -> @show(x) isa Integer ? x + 1 : x .+ 1, (3, 5))\nx = (3, 5)\nx = 4\nx = 6\n(5, 7)\n\njulia> prewalk(x -> @show(x) isa Integer ? StructWalk.LeafNode(x // 2) : x isa Tuple ? =>(x .+ 1...) : x, (3, 5))\nx = (3, 5)\nx = 4\nx = 6\n2//1 => 3//1\n\n\nSee also: postwalk, LeafNode\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.scan-Tuple{Any, Any}","page":"Home","title":"StructWalk.scan","text":"scan(f, [style = WalkStyle], x)\n\nWalk through x without constructing anything.\n\n\n\n\n\n","category":"method"},{"location":"#StructWalk.walkstyle","page":"Home","title":"StructWalk.walkstyle","text":"walkstyle(::CustomWalkStyle, x::T) where {CumstomWalkStyle <: WalkStyle}\n\nShould return a tuple of length 3 with:\n\n1. [constructor](@ref): A proper constuctor for `T`, can be `identity` if `x` isa leaf.\n2. [children](@ref): Children of `x` in a tuple, or empty tuple `()` if `x` is a leaf.\n3. [iscontainer](@ref): A bool indicate whether element of 2. is the actual list of children. default to `false`.\n\nFor example, since Array has 0 fieldcount, we doesn't split the value into a tuple as children.  Instead, we return (x,) as children and the extra boolean true, so it will walk/map through x  accordingly.\n\n\n\n\n\n","category":"function"},{"location":"#StructWalk.walkstyle-Tuple{Any}","page":"Home","title":"StructWalk.walkstyle","text":"walkstyle(x)\nwalkstyle(::Type{WalkStyle}, x::T) where T\n\nReturn T and a tuple all field values of x. The default behavior use  ConstructionBase.constructorof for the constructor and  ConstructionBase.getfields for the children.\n\n\n\n\n\n","category":"method"}]
}
