type ToolProps = {
    children: React.ReactNode;
    action: () => void;
};
export default function Tool({ action, children }: ToolProps) {
    return (
        <div className="cursor-pointer border p-2 border-white" onClick={action}>
            {children}
        </div>
    );
}
