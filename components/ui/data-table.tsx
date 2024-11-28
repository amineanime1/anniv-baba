import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import { cn } from "@/lib/utils";
  
  interface Column {
    key: string;
    label: string;
    className?: string;
  }
  
  interface DataTableProps {
    columns: Column[];
    data: any[];
    renderMobileCard?: (item: any) => React.ReactNode;
    renderDetails?: (item: any) => React.ReactNode;
  }
  
  export function DataTable({
    columns,
    data,
    renderMobileCard,
    renderDetails,
  }: DataTableProps) {
    const [selectedItem, setSelectedItem] = useState<any>(null);
  
    return (
      <>
        {/* Desktop Table View */}
        <div className="hidden md:block rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-6 py-3 text-left text-sm font-medium",
                        column.className
                      )}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => renderDetails && setSelectedItem(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-6 py-4 text-sm whitespace-nowrap",
                          column.className
                        )}
                      >
                        {item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-lg border p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => renderDetails && setSelectedItem(item)}
            >
              {renderMobileCard ? renderMobileCard(item) : (
                <div className="space-y-2">
                  {columns.map((column) => (
                    <div key={column.key} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{column.label}:</span>
                      <span className="text-sm">{item[column.key]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
  
        {/* Details Dialog */}
        {renderDetails && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Details</DialogTitle>
              </DialogHeader>
              {selectedItem && renderDetails(selectedItem)}
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }