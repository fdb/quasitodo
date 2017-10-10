import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Alert } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import TodoItem from './TodoItem';

const INITIAL_ITEMS = [
  { key: 1507129580608, text: 'Welcome to Quasitodo!', complete: false },
  { key: 1507129597587, text: 'Add new to-do items at the top.', complete: false }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', filter: 'all' };
  }

  componentWillMount() {
    AsyncStorage.getItem('items').then(json => {
      if (!json) {
        // There are no items yet. We load up the initial items.
        this.setState({ items: INITIAL_ITEMS });
        return;
      }
      try {
        const items = JSON.parse('123412(');
        this.setState({ items });
      } catch (e) {
        Alert.alert('Quasitodo', 'Something went wrong when loading your items.');
        this.setState({ items: INITIAL_ITEMS });
      }
    });
  }

  setItems(items) {
    AsyncStorage.setItem('items', JSON.stringify(items));
    this.setState({ items });
  }

  onChangeText(text) {
    this.setState({ text });
  }

  onAddItem() {
    const newItem = { key: Date.now(), text: this.state.text, complete: false };
    const newItems = [...this.state.items, newItem];
    this.setItems(newItems);
    this.setState({ text: '' });
  }

  onToggleItem(key, complete) {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) return item;
      return { ...item, complete };
    });
    this.setItems(newItems);
  }

  onFilter(filter) {
    this.setState({ filter });
  }

  onClearCompleted() {
    const newItems = this.state.items.filter(item => !item.complete);
    this.setItems(newItems);
  }

  render() {
    const items = this.state.items.filter(item => {
      if (this.state.filter === 'all') {
        return true;
      } else if (this.state.filter === 'active' && !item.complete) {
        return true;
      } else if (this.state.filter === 'completed' && item.complete) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <View style={styles.container}>
        <Header
          text={this.state.text}
          onChangeText={this.onChangeText.bind(this)}
          onAddItem={this.onAddItem.bind(this)}
        />
        <FlatList style={styles.itemList} data={items} renderItem={this.renderItem.bind(this)} />
        <Footer
          filter={this.state.filter}
          onFilter={this.onFilter.bind(this)}
          onClearCompleted={this.onClearCompleted.bind(this)}
        />
      </View>
    );
  }

  renderItem(item) {
    return <TodoItem item={item.item} onToggleItem={this.onToggleItem.bind(this, item.item.key)} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemList: {
    width: '100%'
  }
});
