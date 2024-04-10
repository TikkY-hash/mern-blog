import { Drawer, List, ListItem, ListItemText } from '@mui/material';

interface EditorSidebarProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  handleEditorClick: () => void;
}

const EditorSidebar = ({
  handleEditorClick,
  isDrawerOpen,
  setIsDrawerOpen,
}: EditorSidebarProps) => (
  <Drawer
    anchor="left"
    open={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    sx={{ '& .MuiDrawer-paper': { width: '200px' } }}
  >
    <List>
      <ListItem key="Editor" onClick={handleEditorClick} className="editorItem">
        <ListItemText primary="Editor" />
      </ListItem>
    </List>
  </Drawer>
);

export default EditorSidebar;
