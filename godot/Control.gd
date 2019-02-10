extends Control

# Declare member variables here. Examples:
# var a = 2
# var b = "text"
const StoryNode = preload("res://GraphNode.tscn")

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass


func _on_Button_pressed():
	print("spawn button pushed")
	# var node = GraphNode.new()	
	var node = StoryNode.instance()
	
	#node.set_slot(0,true,0,Color.aliceblue,true,0,Color.bisque)
	
	$Grid.add_child(node)

	


func _on_Grid_connection_request(from, from_slot, to, to_slot):
	print("from" + from)
	print("to" + to)
	$Grid.connect_node(from,from_slot, to, to_slot)
	
	pass # Replace with function body.
