import { Handle, NodeProps, Position } from 'reactflow';
import { FlowNode } from '@/components/pipelines/pipeline-graph/nodes/FlowNode';
import { TextNode } from '@/lib/pipelines/types';
import { usePipelineNodesStore } from '@/components/pipelines/stores';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LucideAlbum, LucideTextCursorInput, TextCursorIcon, WrapTextIcon } from 'lucide-react';
import { Icons } from '@/components/icons';

export function TextFlowNode({
  data,
  ...props
}: NodeProps<TextNode>) {
  const {
    node,
    setNode,
  } = usePipelineNodesStore(state => ({
    node: state.getTextNode(data.id),
    setNode: state.setNode,
  }));

  function setIsProperty(isProperty: boolean) {
    if (!node) return;
    setNode({ ...node, isProperty });
  }

  function setName(name: string) {
    if (!node) return;
    setNode({ ...node, name });
  }

  function setUseTextbox(useTextbox: boolean) {
    if (!node) return;
    setNode({ ...node, useTextbox });
  }

  function setContent(content: string) {
    if (!node) return;
    setNode({ ...node, content });
  }

  if (!node) {
    return (
      <FlowNode
        title="Text"
        pipelineNode={node}
        data={data}
        {...props}
      >
        No Text node found
      </FlowNode>
    );
  }

  return (
    <FlowNode
      title="Text"
      pipelineNode={node}
      canBeProperty={true}
      Icon={TextCursorIcon}
      data={data}
      {...props}
    >
      <Label className="flex justify-between items-center mb-2">
        <span>Use Textbox</span>
        <Switch checked={node.useTextbox} onCheckedChange={setUseTextbox} />
      </Label>
      {node.useTextbox ? (
        <Textarea
          className="h-32 w-72"
          value={node.content}
          onChange={e => setContent(e.target.value)}
        />
      ) : (
        <Input
          className="w-72"
          value={node.content}
          onChange={e => setContent(e.target.value)}
        />
      )}
      <Handle type="target" position={Position.Right} id="output" />
    </FlowNode>
  )
}
