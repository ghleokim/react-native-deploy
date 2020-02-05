
import * as React from 'react';
import { History, LocationState } from 'history';

interface MapsProps {
    history?: History<LocationState>
}

declare class Maps extends React.Component<MapsProps, any> { }

