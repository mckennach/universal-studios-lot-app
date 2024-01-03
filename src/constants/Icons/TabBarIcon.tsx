

import Icon from './Icons';

export default function TabBarIcon({ name, color, size}: { name: string, color: string, size?: number }) {
    return (
      <Icon
        name={name}
        size={size ? size : 24}
        style={{ marginBottom: -3 }}
        color={color}
      />
    );
}
