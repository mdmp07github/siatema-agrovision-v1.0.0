import { Button } from "@/components/basic/componente/button"
import { Separator } from "@/components/ui/separator"
import { useAppContext } from "@/context/AppContext";
import Icons from "@/images/icons/icons"

function LayoutFooter() {

  const { data } = useAppContext();

  const funResetear = () => {

    data.form?.reset();
    data.form1?.reset();
    data.form2?.reset();
    data.setValueTabDes?.("mdk");
    data.setValueDisabled1?.(true);
    data.setValueDisabled2?.(true);
  }

  return (
    <footer className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 bg-muted/50">
      <div className="flex w-full justify-between px-4">
        <div className="flex items-center gap-2">
          <span>Footer 1</span>
          <Separator
            orientation="vertical"
            className="mx-1"
          />
          <span>Footer 2</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" variant="blue" onClick={() => funResetear()}>
            <Icons icon="document1" />
            <span>Resetear</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default LayoutFooter