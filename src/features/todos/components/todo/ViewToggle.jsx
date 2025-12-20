import { List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ViewToggle({ value, onChange }) {
    return (
        <ButtonGroup orientation="horizontal" aria-label="View toggle">
            <Button
                size="icon"
                variant={value === "list" ? "default" : "outline"}
                onClick={() => onChange("list")}
            >
                <List />
            </Button>

            <Button
                size="icon"
                variant={value === "grid" ? "default" : "outline"}
                onClick={() => onChange("grid")}
            >
                <Grid />
            </Button>
        </ButtonGroup>
    );
}
