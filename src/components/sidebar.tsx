import { Building2Icon, SettingsIcon, StoreIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { id: "Comércio", icon: StoreIcon, label: "Comércio" },
    { id: "Serviços", icon: SettingsIcon, label: "Serviços" },
    { id: "M2", icon: Building2Icon, label: "M2" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-64 bg-secondary p-4">
        <h1 className="text-2xl font-bold mb-6">Sistemas</h1>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <Link
                  className="flex items-center p-2 rounded hover:bg-primary-foreground w-full text-left"
                  to={`manager/${item.id}`}
                >
                  <item.icon className="mr-2" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
